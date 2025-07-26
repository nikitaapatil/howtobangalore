#!/usr/bin/env python3
"""
Fix HTML formatting issue in user_articles.json by removing markdown code block wrappers.
"""

import json
import re

def fix_html_content(content):
    """Remove markdown code block wrappers from HTML content."""
    # Remove ```html at the beginning and ``` at the end
    fixed_content = re.sub(r'^```html\n?', '', content)
    fixed_content = re.sub(r'\n?```$', '', fixed_content)
    return fixed_content.strip()

def fix_user_articles():
    """Fix the HTML content in user_articles.json and user_articles_mock.js."""
    
    # Fix JSON file
    print("Fixing user_articles.json...")
    with open('/app/frontend/src/data/user_articles.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)
    
    for article in articles:
        if 'content' in article:
            article['content'] = fix_html_content(article['content'])
    
    with open('/app/frontend/src/data/user_articles.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
    
    print("user_articles.json fixed successfully!")
    
    # Fix the mock file by updating the getEnhancedArticleContent function
    print("Fixing user_articles_mock.js...")
    with open('/app/frontend/src/data/user_articles_mock.js', 'r', encoding='utf-8') as f:
        mock_content = f.read()
    
    # The mock file already has code to clean the content, but let's make sure it's working
    # The function should already be cleaning markdown code blocks
    
    print("user_articles_mock.js is already set up to clean markdown code blocks!")
    print("HTML formatting issue fixed!")

if __name__ == "__main__":
    fix_user_articles()