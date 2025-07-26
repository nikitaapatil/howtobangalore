#!/usr/bin/env python3

import asyncio
import json
import sys
import os
sys.path.append('/app/backend')

from emergentintegrations.llm.chat import LlmChat, UserMessage

# Generate properly formatted articles with H2/H3/H4 structure
KEY_ARTICLES = [
    {
        "id": 1,
        "title": "The Ultimate Guide to Renting in Bangalore: Broker vs. Online Portals",
        "category": "housing",
        "subcategory": "finding-home",
        "excerpt": "Navigate the complex world of Bangalore rentals with insider tips on brokers, deposits, and negotiation tactics."
    },
    {
        "id": 2,
        "title": "Registering Your Rental Agreement in Bangalore: Is it Necessary?",
        "category": "housing",
        "subcategory": "finding-home",
        "excerpt": "Understanding the legal requirements and practical implications of rental agreement registration."
    },
    {
        "id": 3,
        "title": "Understanding the PG (Paying Guest) Culture in Bangalore",
        "category": "housing",
        "subcategory": "finding-home",
        "excerpt": "A comprehensive guide to PG accommodations - costs, benefits, and what to expect."
    },
    {
        "id": 4,
        "title": "Solo Living in Bangalore: A Guide for Bachelors and Bachelorettes",
        "category": "housing",
        "subcategory": "finding-home",
        "excerpt": "Tips and strategies for independent living in the Silicon Valley of India."
    },
    {
        "id": 5,
        "title": "Choosing Your Bangalore Neighbourhood: A Techie's Guide to Living Near Tech Parks",
        "category": "housing",
        "subcategory": "choosing-neighborhood",
        "excerpt": "Balance commute time, rental costs, and social infrastructure with our comprehensive neighborhood analysis."
    }
]

async def generate_properly_formatted_article(article_data, api_key):
    """Generate properly formatted article with H2/H3/H4 structure and short paragraphs"""
    
    # Initialize Gemini chat
    chat = LlmChat(
        api_key=api_key,
        session_id=f"formatted_article_{article_data['id']}",
        system_message="""You are an expert SEO content writer specializing in comprehensive guides about living in Bangalore. 
        You create detailed, well-structured articles with perfect formatting for maximum readability and SEO performance."""
    ).with_model("gemini", "gemini-1.5-flash").with_max_tokens(8192)
    
    prompt = f"""
    Write a comprehensive, perfectly formatted article of 2000+ words on: "{article_data['title']}"
    
    CRITICAL FORMATTING REQUIREMENTS:
    1. DO NOT use H1 tags - article title is handled separately
    2. Use ONLY H2, H3, H4 tags for section headings
    3. EVERY paragraph must be maximum 2 lines (30-40 words)
    4. Use bullet points and numbered lists extensively
    5. Include practical examples in short paragraphs
    6. Add FAQ section at the end with H3 "Frequently Asked Questions"
    
    STRUCTURE REQUIREMENTS:
    - Start directly with H2 "Introduction" 
    - Use H2 for major sections (5-7 sections)
    - Use H3 for subsections within H2 sections
    - Use H4 for specific points within H3 sections
    - Keep all paragraphs to 1-2 sentences maximum
    - End with H2 "Conclusion" and H3 "Frequently Asked Questions"
    
    BANGALORE-SPECIFIC CONTENT:
    - Include specific locations, neighborhoods, costs in INR
    - Reference local services, apps, and resources
    - Address infrastructure challenges (traffic, power, water)
    - Mention cultural aspects and Kannada phrases
    - Include government processes and documentation
    - Provide realistic cost breakdowns and timeframes
    
    WRITING STYLE:
    - Pragmatic, supportive, and empathetic tone
    - Each paragraph maximum 2 lines
    - Use transition words for better flow
    - Include specific examples and case studies
    - Address the "Bangalore Paradox" concept
    - Write for IT professionals and migrants
    
    OUTPUT FORMAT:
    Return clean HTML with proper heading tags (h2, h3, h4), short paragraphs, lists, and emphasis.
    Start directly with H2 "Introduction" - do not include the main title as H1.
    """
    
    try:
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        return response.strip()
    except Exception as e:
        print(f"Error generating article {article_data['id']}: {str(e)}")
        return None

async def main():
    api_key = "AIzaSyBUBJJm7fRNKNNXT0N6qxwcKMRjAZ3ThhQ"
    
    print("🚀 Starting properly formatted article generation...")
    print(f"📝 Generating {len(KEY_ARTICLES)} perfectly formatted articles")
    
    articles_with_content = []
    
    for i, article in enumerate(KEY_ARTICLES, 1):
        print(f"⏳ Generating article {i}/5: {article['title'][:50]}...")
        
        content = await generate_properly_formatted_article(article, api_key)
        
        if content:
            word_count = len(content.split())
            article_complete = {
                **article,
                "content": content,
                "readTime": f"{word_count // 200 + 1} min read",
                "publishDate": f"2024-0{((i-1) % 12) + 1:02d}-{((i-1) % 28) + 1:02d}",
                "featured": True,
                "wordCount": word_count
            }
            articles_with_content.append(article_complete)
            print(f"✅ Generated {word_count} words for article {i}")
        else:
            print(f"❌ Failed to generate article {i}")
        
        # Delay to respect rate limits
        await asyncio.sleep(3)
    
    # Save to JSON file
    output_file = '/app/frontend/src/data/formatted_articles.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles_with_content, f, indent=2, ensure_ascii=False)
    
    print(f"🎉 Successfully generated {len(articles_with_content)} properly formatted articles!")
    print(f"📁 Articles saved to: {output_file}")
    
    # Print statistics
    total_words = sum(article['wordCount'] for article in articles_with_content)
    avg_words = total_words // len(articles_with_content) if articles_with_content else 0
    
    print(f"\n📊 STATISTICS:")
    print(f"   Total articles: {len(articles_with_content)}")
    print(f"   Total words: {total_words:,}")
    print(f"   Average words per article: {avg_words:,}")

if __name__ == "__main__":
    asyncio.run(main())