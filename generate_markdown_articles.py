#!/usr/bin/env python3

import asyncio
import json
import sys
import os
sys.path.append('/app/backend')

from emergentintegrations.llm.chat import LlmChat, UserMessage

# Generate articles with proper HTML markdown formatting
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
    }
]

async def generate_markdown_formatted_article(article_data, api_key):
    """Generate article with rich HTML markdown formatting"""
    
    # Initialize Gemini chat
    chat = LlmChat(
        api_key=api_key,
        session_id=f"markdown_article_{article_data['id']}",
        system_message="""You are an expert content writer who creates comprehensive, beautifully formatted articles about living in Bangalore. 
        You specialize in creating rich HTML content with proper markdown-style formatting, lists, tables, and visual elements."""
    ).with_model("gemini", "gemini-1.5-flash").with_max_tokens(8192)
    
    prompt = f"""
    Write a comprehensive, richly formatted article of 2000+ words on: "{article_data['title']}"
    
    CRITICAL HTML FORMATTING REQUIREMENTS:
    1. Use ONLY H2, H3, H4 tags for section headings (NO H1)
    2. Every paragraph must be maximum 2 lines (30-40 words each)
    3. Use rich HTML formatting including:
       - <strong> for bold text
       - <em> for emphasis
       - <code> for technical terms
       - <blockquote> for important tips
       - <ul> and <ol> for lists
       - <table> for data comparisons
    4. Add visual elements like colored info boxes
    
    EXAMPLE FORMATTING TO INCLUDE:
    
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p><strong>💡 Pro Tip:</strong> Always negotiate rental deposits in Bangalore.</p>
        <p>The standard practice is 10 months, but you can often reduce it to 6-8 months.</p>
    </div>
    
    <table class="w-full border-collapse border border-gray-300 mb-6">
        <thead class="bg-gray-100">
            <tr>
                <th class="border border-gray-300 p-2">Area</th>
                <th class="border border-gray-300 p-2">Average Rent (2BHK)</th>
                <th class="border border-gray-300 p-2">Commute Time</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border border-gray-300 p-2">Koramangala</td>
                <td class="border border-gray-300 p-2">₹35,000 - ₹50,000</td>
                <td class="border border-gray-300 p-2">20-30 mins</td>
            </tr>
        </tbody>
    </table>
    
    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p><strong>⚠️ Warning:</strong> Avoid paying advance without proper verification.</p>
        <p>Always insist on a receipt and visit the property in person.</p>
    </div>
    
    BANGALORE-SPECIFIC RICH CONTENT:
    - Create comparison tables with costs in INR
    - Include formatted checklists
    - Add highlighted boxes for important warnings
    - Use specific examples with real locations and costs
    
    CONTENT STRUCTURE:
    - H2 "Introduction" with overview
    - H2 "Understanding the Challenge" with problem description
    - H2 "Detailed Analysis" with H3 subsections
    - H2 "Cost Breakdown" with formatted tables
    - H2 "Step-by-Step Guide" with numbered lists
    - H2 "Pro Tips" with highlighted boxes
    - H2 "Common Mistakes" with warning boxes
    - H2 "FAQ" with structured Q&A
    - H2 "Conclusion" with action items
    
    WRITING STYLE:
    - Each paragraph exactly 1-2 sentences (30-40 words maximum)
    - Use transition words for flow
    - Include specific examples with formatting
    - Make it visually engaging and easy to scan
    
    OUTPUT FORMAT:
    Return clean, rich HTML with extensive formatting, tables, lists, and visual elements.
    Start directly with H2 "Introduction" - no main title.
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
    
    print("🚀 Starting rich markdown article generation...")
    print(f"📝 Generating {len(KEY_ARTICLES)} richly formatted articles")
    
    articles_with_content = []
    
    for i, article in enumerate(KEY_ARTICLES, 1):
        print(f"⏳ Generating article {i}/3: {article['title'][:50]}...")
        
        content = await generate_markdown_formatted_article(article, api_key)
        
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
    
    print(f"🎉 Successfully generated {len(articles_with_content)} richly formatted articles!")
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