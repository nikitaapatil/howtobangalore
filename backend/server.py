from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import re
import markdown
import base64
from urllib.parse import urlparse
import html

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-this-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI(title="How to Bangalore API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: str
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class AdminUserCreate(BaseModel):
    username: str
    email: str
    password: str

class AdminUserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_info: dict

class Article(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    content: str
    excerpt: str
    category: str
    subcategory: str
    read_time: str
    word_count: int
    featured_image: Optional[str] = None
    published: bool = True
    featured: bool = False
    author: str = "Admin"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    publish_date: str

class ArticleCreate(BaseModel):
    title: str
    content: str
    category: str
    subcategory: str
    featured: bool = False
    published: bool = True

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None

# Utility functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def generate_slug(title: str) -> str:
    """Generate URL-friendly slug from article title with main keywords."""
    # Convert to lowercase and replace spaces with hyphens
    slug = title.lower()
    
    # Remove special characters and keep only alphanumeric, spaces, and hyphens
    slug = re.sub(r'[^a-z0-9\s\-]', '', slug)
    
    # Replace multiple spaces with single space
    slug = re.sub(r'\s+', ' ', slug)
    
    # Extract main keywords (remove common words)
    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'how', 'your'}
    words = [word for word in slug.split() if word not in stop_words and len(word) > 2]
    
    # Take first 4-5 meaningful words
    keywords = words[:5]
    
    # Join with hyphens
    slug = '-'.join(keywords)
    
    # Remove any double hyphens
    slug = re.sub(r'-+', '-', slug)
    
    # Remove leading/trailing hyphens
    slug = slug.strip('-')
    
    return slug or 'article'

def extract_excerpt(content: str, max_length: int = 150) -> str:
    """Extract excerpt from markdown or HTML content."""
    # Remove HTML tags first
    clean_text = re.sub(r'<[^>]+>', '', content)
    # Remove markdown formatting
    clean_text = re.sub(r'[#*_`\[\]()!]', '', clean_text)
    clean_text = re.sub(r'\n+', ' ', clean_text)
    clean_text = clean_text.strip()
    
    # Find first substantial paragraph
    paragraphs = [p.strip() for p in clean_text.split('.') if len(p.strip()) > 50]
    
    if paragraphs:
        excerpt = paragraphs[0] + '.'
        if len(excerpt) > max_length:
            excerpt = excerpt[:max_length-3] + '...'
        return excerpt
    
    # Fallback to first few words
    words = clean_text.split()[:20]
    return ' '.join(words) + '...'

def calculate_read_time(content: str) -> str:
    """Calculate reading time based on word count."""
    word_count = len(content.split())
    read_time = max(1, round(word_count / 200))
    return f"{read_time} min read"

def process_markdown_to_html(content: str) -> tuple:
    """Convert markdown to HTML and extract featured image."""
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=['extra', 'codehilite'])
    html_content = md.convert(content)
    
    # Extract first image as featured image (if any)
    img_pattern = r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>'
    img_match = re.search(img_pattern, html_content)
    featured_image = img_match.group(1) if img_match else None
    
    return html_content, featured_image

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    user = await db.admin_users.find_one({"username": username})
    if user is None:
        raise credentials_exception
    return AdminUser(**user)

# Auth routes
@api_router.post("/admin/register", response_model=Token)
async def register_admin(user_data: AdminUserCreate):
    # Only allow registration for specific email
    ALLOWED_ADMIN_EMAIL = "nikitaapatil@gmail.com"
    
    if user_data.email.lower() != ALLOWED_ADMIN_EMAIL.lower():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Admin registration is restricted. Only {ALLOWED_ADMIN_EMAIL} is authorized to create an admin account."
        )
    
    # Check if any admin already exists with this email
    existing_user = await db.admin_users.find_one({
        "$or": [
            {"username": user_data.username},
            {"email": user_data.email}
        ]
    })
    
    if existing_user:
        if existing_user["email"] == user_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An admin account with this email already exists. Please login instead."
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already exists"
            )
    
    # Create new admin user
    hashed_password = get_password_hash(user_data.password)
    user = AdminUser(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password
    )
    
    await db.admin_users.insert_one(user.dict())
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_info": {
            "username": user.username,
            "email": user.email,
            "id": user.id
        }
    }

@api_router.post("/admin/login", response_model=Token)
async def login_admin(login_data: AdminUserLogin):
    user = await db.admin_users.find_one({"username": login_data.username})
    if not user or not verify_password(login_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_info": {
            "username": user["username"],
            "email": user["email"],
            "id": user["id"]
        }
    }

@api_router.get("/admin/me")
async def get_current_admin(current_user: AdminUser = Depends(get_current_user)):
    return {
        "username": current_user.username,
        "email": current_user.email,
        "id": current_user.id
    }

# Article routes
@api_router.post("/admin/articles", response_model=Article)
async def create_article(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    subcategory: str = Form(""),
    featured: bool = Form(False),
    published: bool = Form(True),
    file: Optional[UploadFile] = File(None),
    current_user: AdminUser = Depends(get_current_user)
):
    # Generate slug from title
    slug = generate_slug(title)
    
    # Check if slug already exists
    existing_article = await db.articles.find_one({"slug": slug})
    if existing_article:
        # Add timestamp to make unique
        slug = f"{slug}-{int(datetime.utcnow().timestamp())}"
    
    # Process markdown content
    html_content, featured_image = process_markdown_to_html(content)
    
    # If file uploaded, process it as featured image
    if file:
        file_content = await file.read()
        file_base64 = base64.b64encode(file_content).decode('utf-8')
        content_type = file.content_type or 'image/jpeg'
        featured_image = f"data:{content_type};base64,{file_base64}"
    
    # Create article
    article = Article(
        title=title,
        slug=slug,
        content=html_content,
        excerpt=extract_excerpt(content),
        category=category,
        subcategory=subcategory,
        read_time=calculate_read_time(content),
        word_count=len(content.split()),
        featured_image=featured_image,
        featured=featured,
        published=published,
        publish_date=datetime.utcnow().strftime("%Y-%m-%d")
    )
    
    await db.articles.insert_one(article.dict())
    return article

@api_router.get("/articles", response_model=List[Article])
async def get_published_articles():
    articles = await db.articles.find({"published": True}).to_list(1000)
    return [Article(**article) for article in articles]

@api_router.get("/articles/{slug}", response_model=Article)
async def get_article_by_slug(slug: str):
    article = await db.articles.find_one({"slug": slug, "published": True})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return Article(**article)

@api_router.get("/admin/articles", response_model=List[Article])
async def get_all_articles(current_user: AdminUser = Depends(get_current_user)):
    articles = await db.articles.find().to_list(1000)
    return [Article(**article) for article in articles]

@api_router.put("/admin/articles/{article_id}", response_model=Article)
async def update_article(
    article_id: str,
    article_update: ArticleUpdate,
    current_user: AdminUser = Depends(get_current_user)
):
    article = await db.articles.find_one({"id": article_id})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    update_data = article_update.dict(exclude_unset=True)
    
    # If title is updated, regenerate slug
    if "title" in update_data:
        update_data["slug"] = generate_slug(update_data["title"])
    
    # If content is updated, reprocess it
    if "content" in update_data:
        html_content, featured_image = process_markdown_to_html(update_data["content"])
        update_data["content"] = html_content
        update_data["excerpt"] = extract_excerpt(update_data["content"])
        update_data["read_time"] = calculate_read_time(update_data["content"])
        update_data["word_count"] = len(update_data["content"].split())
    
    update_data["updated_at"] = datetime.utcnow()
    
    await db.articles.update_one({"id": article_id}, {"$set": update_data})
    
    updated_article = await db.articles.find_one({"id": article_id})
    return Article(**updated_article)

@api_router.delete("/admin/articles/{article_id}")
async def delete_article(
    article_id: str,
    current_user: AdminUser = Depends(get_current_user)
):
    result = await db.articles.delete_one({"id": article_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted successfully"}

@api_router.delete("/admin/articles")
async def clear_all_articles(current_user: AdminUser = Depends(get_current_user)):
    """Clear all articles from the database."""
    result = await db.articles.delete_many({})
    return {"message": f"Deleted {result.deleted_count} articles"}

@api_router.post("/admin/articles/upload-file")
async def upload_file(
    file: UploadFile = File(...),
    category: str = Form(...),
    subcategory: str = Form(""),
    featured: bool = Form(False),
    current_user: AdminUser = Depends(get_current_user)
):
    """Upload a markdown or HTML file and create an article."""
    if not (file.filename.endswith('.md') or file.filename.endswith('.html')):
        raise HTTPException(status_code=400, detail="File must be a markdown (.md) or HTML (.html) file")
    
    content = await file.read()
    file_content = content.decode('utf-8')
    
    # Determine file type and process accordingly
    is_html = file.filename.endswith('.html')
    
    if is_html:
        # For HTML files, extract title from <title> tag or <h1> tag
        title_match = re.search(r'<title[^>]*>([^<]+)</title>', file_content, re.IGNORECASE)
        if not title_match:
            title_match = re.search(r'<h1[^>]*>([^<]+)</h1>', file_content, re.IGNORECASE)
        
        title = title_match.group(1).strip() if title_match else file.filename.replace('.html', '').replace('_', ' ').title()
        
        # For HTML files, use content as-is (no markdown conversion needed)
        html_content = file_content
        featured_image = None
        
        # Extract featured image from HTML if present
        img_pattern = r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>'
        img_match = re.search(img_pattern, html_content)
        if img_match:
            featured_image = img_match.group(1)
    else:
        # For markdown files, use existing processing
        title_match = re.search(r'^#\s+(.+)$', file_content, re.MULTILINE)
        title = title_match.group(1) if title_match else file.filename.replace('.md', '').replace('_', ' ').title()
        
        # Process markdown content
        html_content, featured_image = process_markdown_to_html(file_content)
    
    # Generate slug
    slug = generate_slug(title)
    
    # Check if slug already exists
    existing_article = await db.articles.find_one({"slug": slug})
    if existing_article:
        slug = f"{slug}-{int(datetime.utcnow().timestamp())}"
    
    # Create article
    article = Article(
        title=title,
        slug=slug,
        content=html_content,
        excerpt=extract_excerpt(file_content if not is_html else html_content),
        category=category,
        subcategory=subcategory,
        read_time=calculate_read_time(file_content if not is_html else html_content),
        word_count=len((file_content if not is_html else html_content).split()),
        featured_image=featured_image,
        featured=featured,
        published=True,
        publish_date=datetime.utcnow().strftime("%Y-%m-%d")
    )
    
    await db.articles.insert_one(article.dict())
    return article

# Existing routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
