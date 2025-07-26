#!/usr/bin/env python3
"""
Process user-provided markdown articles and convert them to the format used by the frontend.
This script will:
1. Parse markdown files
2. Extract and download images locally
3. Convert markdown to HTML
4. Generate the data structure for the frontend
"""

import os
import json
import re
import requests
import base64
from urllib.parse import urlparse
import markdown
from datetime import datetime

def download_and_encode_image(image_url, filename):
    """Download an image and encode it as base64."""
    try:
        print(f"Downloading image: {image_url}")
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()
        
        # Encode image as base64
        base64_image = base64.b64encode(response.content).decode('utf-8')
        
        # Determine content type
        content_type = response.headers.get('content-type', 'image/jpeg')
        
        # Create data URL
        data_url = f"data:{content_type};base64,{base64_image}"
        
        print(f"Successfully processed image: {filename}")
        return data_url
        
    except Exception as e:
        print(f"Error downloading image {image_url}: {e}")
        return None

def extract_images_from_markdown(content):
    """Extract image URLs from markdown content."""
    # Pattern to match markdown images: ![alt text](url)
    image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    images = re.findall(image_pattern, content)
    return images

def process_markdown_to_html(content, article_id):
    """Convert markdown to HTML and handle images."""
    # Extract images first
    images = extract_images_from_markdown(content)
    processed_content = content
    featured_image = None
    
    # Process each image
    for i, (alt_text, image_url) in enumerate(images):
        print(f"Processing image {i+1}/{len(images)} for article {article_id}")
        
        # Download and encode image
        filename = f"article_{article_id}_image_{i+1}"
        base64_image = download_and_encode_image(image_url, filename)
        
        if base64_image:
            # Replace the markdown image with HTML img tag using base64
            old_pattern = f"![{re.escape(alt_text)}]({re.escape(image_url)})"
            new_html = f'<img src="{base64_image}" alt="{alt_text}" class="w-full rounded-lg mb-6" />'
            processed_content = processed_content.replace(old_pattern, new_html)
            
            # Use first image as featured image
            if i == 0:
                featured_image = base64_image
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=['extra', 'codehilite'])
    html_content = md.convert(processed_content)
    
    return html_content, featured_image

def extract_metadata_from_markdown(content):
    """Extract title and basic metadata from markdown."""
    lines = content.split('\n')
    title = ""
    
    # Find the first H1 heading
    for line in lines:
        if line.startswith('# '):
            title = line[2:].strip()
            break
    
    # Calculate reading time (approximately 200 words per minute)
    word_count = len(content.split())
    read_time = max(1, round(word_count / 200))
    
    return title, f"{read_time} min read", word_count

def create_excerpt_from_content(content, max_length=150):
    """Create an excerpt from the markdown content."""
    # Remove markdown formatting and get clean text
    clean_text = re.sub(r'[#*_`\[\]()!]', '', content)
    clean_text = re.sub(r'\n+', ' ', clean_text)
    clean_text = clean_text.strip()
    
    # Find the first substantial paragraph
    paragraphs = [p.strip() for p in clean_text.split('.') if len(p.strip()) > 50]
    
    if paragraphs:
        excerpt = paragraphs[0] + '.'
        if len(excerpt) > max_length:
            excerpt = excerpt[:max_length-3] + '...'
        return excerpt
    
    # Fallback to first few words
    words = clean_text.split()[:20]
    return ' '.join(words) + '...'

def determine_category_and_subcategory(title):
    """Determine category and subcategory based on article title."""
    title_lower = title.lower()
    
    if 'aadhaar' in title_lower or 'address proof' in title_lower:
        return 'government', 'documentation'
    elif 'neighbourhood' in title_lower or 'choosing' in title_lower:
        return 'housing', 'choosing-neighborhood'
    elif 'commute' in title_lower or 'metro' in title_lower or 'bmtc' in title_lower:
        return 'transport', 'navigating-roads'
    elif 'utilities' in title_lower or 'bescom' in title_lower or 'bwssb' in title_lower:
        return 'utilities', 'electricity-water'
    elif 'renting' in title_lower or 'rental' in title_lower:
        return 'housing', 'finding-home'
    else:
        return 'lifestyle', 'general'

def process_articles():
    """Main function to process all articles."""
    article_files = [
        'article1.md',  # Address Proof 101
        'article2.md',  # Choosing Your Bangalore Neighbourhood
        'article3.md',  # Mastering the Bangalore Commute
        'article4.md',  # Decoding Bangalore's Utilities
        'article5.md'   # The Ultimate Guide to Renting in Bangalore
    ]
    
    processed_articles = []
    
    for i, filename in enumerate(article_files, 1):
        print(f"\n=== Processing {filename} ===")
        
        try:
            with open(f'/app/{filename}', 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract metadata
            title, read_time, word_count = extract_metadata_from_markdown(content)
            excerpt = create_excerpt_from_content(content)
            category, subcategory = determine_category_and_subcategory(title)
            
            # Process content and images
            html_content, featured_image = process_markdown_to_html(content, i)
            
            # Create article object
            article = {
                "id": i,
                "title": title,
                "category": category,
                "subcategory": subcategory,
                "excerpt": excerpt,
                "content": f"```html\n{html_content}\n```",
                "readTime": read_time,
                "publishDate": f"2024-{i:02d}-15",
                "featured": i <= 5,  # All 5 articles are featured
                "wordCount": word_count,
                "featuredImage": featured_image
            }
            
            processed_articles.append(article)
            print(f"Successfully processed: {title}")
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            continue
    
    return processed_articles

def create_categories_structure(articles):
    """Create the categories structure for the frontend."""
    categories = {
        'government': {
            'id': 'government',
            'name': 'Government & Documentation',
            'description': 'Navigate government processes and essential documentation in Bangalore',
            'icon': 'FileText',
            'subcategories': {
                'documentation': {
                    'id': 'documentation',
                    'name': 'Essential Documentation',
                    'posts': []
                }
            }
        },
        'housing': {
            'id': 'housing',
            'name': 'Housing & Home Setup',
            'description': 'Everything about finding, setting up, and managing your home in Bangalore',
            'icon': 'Home',
            'subcategories': {
                'finding-home': {
                    'id': 'finding-home',
                    'name': 'Finding Your Home',
                    'posts': []
                },
                'choosing-neighborhood': {
                    'id': 'choosing-neighborhood',
                    'name': 'Choosing Your Neighborhood',
                    'posts': []
                }
            }
        },
        'transport': {
            'id': 'transport',
            'name': 'Transport & Commute',
            'description': 'Master Bangalore\'s complex transportation system and optimize your daily commute',
            'icon': 'Car',
            'subcategories': {
                'navigating-roads': {
                    'id': 'navigating-roads',
                    'name': 'Navigating Bangalore\'s Roads',
                    'posts': []
                }
            }
        },
        'utilities': {
            'id': 'utilities',
            'name': 'Utilities & Home Services',
            'description': 'Navigate BESCOM, BWSSB, and other essential utilities like a pro',
            'icon': 'Zap',
            'subcategories': {
                'electricity-water': {
                    'id': 'electricity-water',
                    'name': 'Electricity & Water',
                    'posts': []
                }
            }
        }
    }
    
    # Organize articles into categories
    for article in articles:
        category_id = article['category']
        subcategory_id = article['subcategory']
        
        if category_id in categories and subcategory_id in categories[category_id]['subcategories']:
            categories[category_id]['subcategories'][subcategory_id]['posts'].append(article)
    
    # Convert to the expected format
    categories_list = []
    for cat_id, cat_data in categories.items():
        subcategories_list = []
        for sub_id, sub_data in cat_data['subcategories'].items():
            if sub_data['posts']:  # Only include subcategories with posts
                subcategories_list.append({
                    'id': sub_data['id'],
                    'name': sub_data['name'],
                    'posts': sub_data['posts']
                })
        
        if subcategories_list:  # Only include categories with subcategories
            categories_list.append({
                'id': cat_data['id'],
                'name': cat_data['name'],
                'description': cat_data['description'],
                'icon': cat_data['icon'],
                'subcategories': subcategories_list
            })
    
    return categories_list

def generate_updated_mock_file(articles, categories):
    """Generate the updated mock data file."""
    
    # Create featured images mapping (using base64 images)
    featured_images = {}
    for article in articles:
        if article.get('featuredImage'):
            featured_images[article['id']] = article['featuredImage']
    
    mock_content = f'''// Enhanced mock data with user-provided articles
import formattedArticles from './user_articles.json';

// Featured images mapping for articles (using base64 encoded images)
const FEATURED_IMAGES = {json.dumps(featured_images, indent=2)};

// Create a mapping of formatted articles by ID
const formattedArticleMap = {{}};
try {{
  formattedArticles.forEach(article => {{
    formattedArticleMap[article.id] = article;
  }});
}} catch (error) {{
  console.log('User articles not yet available, using placeholder content');
}}

// Helper function to get article content with featured image
const getEnhancedArticleContent = (id, title, excerpt) => {{
  const featuredImage = FEATURED_IMAGES[id];
  
  if (formattedArticleMap[id]) {{
    // Clean markdown code blocks from content
    const cleanContent = formattedArticleMap[id].content
      .replace(/```html\\n?/, '')
      .replace(/\\n?```$/, '')
      .trim();
    
    return {{
      content: cleanContent,
      readTime: formattedArticleMap[id].readTime,
      wordCount: formattedArticleMap[id].wordCount,
      featuredImage,
      featured: formattedArticleMap[id].featured
    }};
  }}
  
  // Fallback for missing articles
  return {{
    content: `<p>Content not available for: ${{title}}</p>`,
    readTime: "5 min read",
    wordCount: 100,
    featuredImage,
    featured: false
  }};
}};

export const categories = {json.dumps(categories, indent=2)};

export const featuredPosts = categories.flatMap(category => 
  category.subcategories.flatMap(subcategory => 
    subcategory.posts.filter(post => post.featured)
  )
);

export const allPosts = categories.flatMap(category => 
  category.subcategories.flatMap(subcategory => subcategory.posts)
);

export const searchPosts = (query) => {{
  if (!query.trim()) return allPosts;
  
  const lowerQuery = query.toLowerCase();
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery)
  );
}};

export const getPostsByCategory = (categoryId) => {{
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return category.subcategories.flatMap(subcategory => subcategory.posts);
}};

export const getPostById = (id) => {{
  return allPosts.find(post => post.id === parseInt(id));
}};
'''
    
    return mock_content

if __name__ == "__main__":
    print("Starting to process user-provided articles...")
    
    # Process all articles
    articles = process_articles()
    
    if not articles:
        print("No articles were processed successfully!")
        exit(1)
    
    print(f"\nSuccessfully processed {len(articles)} articles")
    
    # Create categories structure
    categories = create_categories_structure(articles)
    
    # Save processed articles to JSON
    with open('/app/frontend/src/data/user_articles.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
    
    # Generate updated mock file
    updated_mock_content = generate_updated_mock_file(articles, categories)
    
    # Write the updated mock file
    with open('/app/frontend/src/data/user_articles_mock.js', 'w', encoding='utf-8') as f:
        f.write(updated_mock_content)
    
    print("\n=== Processing Complete ===")
    print("Files created:")
    print("- /app/frontend/src/data/user_articles.json")
    print("- /app/frontend/src/data/user_articles_mock.js")
    print("\nNext step: Update the frontend to use the new data files")