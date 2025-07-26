#!/usr/bin/env python3

import asyncio
import json
import sys
import os
sys.path.append('/app/backend')

from emergentintegrations.llm.chat import LlmChat, UserMessage

# Generate comprehensive content for 5 key articles first
KEY_ARTICLES = [
    {
        "id": 1,
        "title": "The Ultimate Guide to Renting in Bangalore: Broker vs. Online Portals",
        "category": "housing",
        "subcategory": "finding-home",
        "excerpt": "Navigate the complex world of Bangalore rentals with insider tips on brokers, deposits, and negotiation tactics."
    },
    {
        "id": 5,
        "title": "Choosing Your Bangalore Neighbourhood: A Techie's Guide to Living Near Tech Parks",
        "category": "housing", 
        "subcategory": "choosing-neighborhood",
        "excerpt": "Balance commute time, rental costs, and social infrastructure with our comprehensive neighborhood analysis."
    },
    {
        "id": 16,
        "title": "Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing",
        "category": "transport",
        "subcategory": "navigating-roads", 
        "excerpt": "Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies."
    },
    {
        "id": 26,
        "title": "Decoding Bangalore's Utilities: BESCOM, BWSSB, and GAIL",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Understand Bangalore's utility providers and how to manage your connections effectively."
    },
    {
        "id": 34,
        "title": "The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples",
        "category": "lifestyle",
        "subcategory": "cost-finance",
        "excerpt": "Realistic budget breakdown confronting the cost-benefit miscalculation narrative."
    }
]

async def generate_comprehensive_article(article_data, api_key):
    """Generate a comprehensive 2500-3000 word article using Gemini 1.5 Flash"""
    
    # Initialize Gemini chat
    chat = LlmChat(
        api_key=api_key,
        session_id=f"article_{article_data['id']}",
        system_message="""You are an expert content writer specializing in practical, insider guides about living in Bangalore. 
        You have deep knowledge of the city's infrastructure, culture, costs, and daily life challenges. 
        Write comprehensive, detailed articles that provide real value to IT professionals and migrants living in Bangalore."""
    ).with_model("gemini", "gemini-1.5-flash").with_max_tokens(8192)
    
    prompt = f"""
    Write a comprehensive, deeply researched article of 2500-3000 words on the topic: "{article_data['title']}"
    
    REQUIREMENTS:
    1. Write in a pragmatic, supportive, and empathetic tone - like a knowledgeable friend who has successfully navigated Bangalore
    2. Include specific, actionable advice with real costs, locations, processes, and insider tips
    3. Address the "Bangalore Paradox" - the gap between expectations and reality
    4. Include practical examples, step-by-step processes, and real-world scenarios
    5. Provide specific cost breakdowns, time estimates, and location details where relevant
    6. Address common challenges and provide concrete solutions
    7. Use HTML formatting with proper headings (h2, h3), paragraphs, lists, and emphasis
    8. Include practical tips in highlighted boxes or sections
    9. End with actionable next steps or key takeaways
    
    CONTENT DEPTH:
    - Start with acknowledging the challenge/context
    - Provide detailed, insider knowledge
    - Include specific locations, costs, timeframes
    - Address common pitfalls and how to avoid them
    - Provide step-by-step guidance where applicable
    - Include real examples and scenarios
    - End with practical action items
    
    BANGALORE-SPECIFIC CONTEXT:
    - Reference specific locations, neighborhoods, and landmarks
    - Include actual cost ranges and timeframes
    - Address infrastructure challenges like traffic, power cuts, water issues
    - Mention local culture, language considerations
    - Include government processes, documentation requirements
    - Reference local service providers, markets, establishments
    
    Write the article content in HTML format, ready to be inserted into a React component. Start directly with the content - no title or meta information needed.
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
    
    print("🚀 Starting comprehensive article generation (5 key articles)...")
    print(f"📝 Generating {len(KEY_ARTICLES)} detailed articles using Gemini 1.5 Flash")
    
    articles_with_content = []
    
    for i, article in enumerate(KEY_ARTICLES, 1):
        print(f"⏳ Generating article {i}/5: {article['title'][:60]}...")
        
        content = await generate_comprehensive_article(article, api_key)
        
        if content:
            article_complete = {
                **article,
                "content": content,
                "readTime": f"{len(content.split()) // 200 + 1} min read",
                "publishDate": f"2024-0{(i % 12) + 1:02d}-{(i % 28) + 1:02d}",
                "featured": True  # These are all featured articles
            }
            articles_with_content.append(article_complete)
            print(f"✅ Generated {len(content.split())} words for article {i}")
        else:
            print(f"❌ Failed to generate article {i}")
        
        # Small delay to respect rate limits
        await asyncio.sleep(3)
    
    # Save to JSON file
    output_file = '/app/frontend/src/data/generated_articles.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles_with_content, f, indent=2, ensure_ascii=False)
    
    print(f"🎉 Successfully generated {len(articles_with_content)} comprehensive articles!")
    print(f"📁 Articles saved to: {output_file}")
    
    # Print statistics
    total_words = sum(len(article['content'].split()) for article in articles_with_content)
    avg_words = total_words // len(articles_with_content) if articles_with_content else 0
    
    print(f"\n📊 STATISTICS:")
    print(f"   Total articles: {len(articles_with_content)}")
    print(f"   Total words: {total_words:,}")
    print(f"   Average words per article: {avg_words:,}")
    print(f"   Featured articles: {sum(1 for a in articles_with_content if a.get('featured', False))}")

if __name__ == "__main__":
    asyncio.run(main())