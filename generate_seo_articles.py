#!/usr/bin/env python3

import asyncio
import json
import sys
import os
sys.path.append('/app/backend')

from emergentintegrations.llm.chat import LlmChat, UserMessage

# Generate 30 key articles covering all major topics
KEY_ARTICLES = [
    # Housing & Home Setup (8 articles)
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
    },
    {
        "id": 6,
        "title": "Koramangala vs HSR Layout vs Indiranagar: The Ultimate Neighborhood Comparison",
        "category": "housing",
        "subcategory": "choosing-neighborhood",
        "excerpt": "Detailed analysis of Bangalore's most popular residential areas for young professionals."
    },
    {
        "id": 7,
        "title": "The Best Broadband for Your Home: ACT vs JioFiber vs Airtel",
        "category": "housing",
        "subcategory": "home-setup",
        "excerpt": "Compare internet providers to find the best connectivity solution for your work-from-home setup."
    },
    {
        "id": 8,
        "title": "A Guide to Domestic Help in Bangalore: Finding, Vetting, and Paying",
        "category": "housing",
        "subcategory": "home-setup",
        "excerpt": "Navigate the domestic help ecosystem with practical advice on hiring and managing household staff."
    },

    # Transport & Commute (6 articles)
    {
        "id": 9,
        "title": "Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies."
    },
    {
        "id": 10,
        "title": "Monsoon Preparedness: How to Survive Bangalore's Rains and Traffic",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Traffic tips and strategies for navigating the city during monsoon season."
    },
    {
        "id": 11,
        "title": "The Bangalore Traffic Police: Understanding Fines and E-Challans",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Stay compliant with traffic rules and understand the e-challan system."
    },
    {
        "id": 12,
        "title": "Your First Vehicle in Bangalore: Used Car vs New Two-Wheeler",
        "category": "transport",
        "subcategory": "personal-vehicles",
        "excerpt": "Make an informed decision about your first vehicle purchase in Bangalore."
    },
    {
        "id": 13,
        "title": "How to Get Your Karnataka Driving License",
        "category": "transport",
        "subcategory": "personal-vehicles",
        "excerpt": "Step-by-step guide to obtaining your driving license in Karnataka."
    },
    {
        "id": 14,
        "title": "Navigating Bangalore's RTOs: A Complete Guide",
        "category": "transport",
        "subcategory": "personal-vehicles",
        "excerpt": "Master the Regional Transport Office procedures and documentation."
    },

    # Utilities & Home Services (5 articles)
    {
        "id": 15,
        "title": "Decoding Bangalore's Utilities: BESCOM, BWSSB, and GAIL",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Understand Bangalore's utility providers and how to manage your connections effectively."
    },
    {
        "id": 16,
        "title": "Dealing with Power Cuts: An Essential Bangalore Survival Guide",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Prepare for power outages with inverters, UPS systems, and backup solutions."
    },
    {
        "id": 17,
        "title": "Understanding Bangalore's Water Tanker System",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Navigate water scarcity with tanker services and water management strategies."
    },
    {
        "id": 18,
        "title": "The Bangalore Hair Fall Epidemic: Hard Water Solutions",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Combat hard water effects with practical solutions and water treatment options."
    },
    {
        "id": 19,
        "title": "Waste Management 101: Understanding BBMP's Segregation Rules",
        "category": "utilities",
        "subcategory": "waste-management",
        "excerpt": "Master Bangalore's waste segregation system and disposal guidelines."
    },

    # Lifestyle & Integration (8 articles)
    {
        "id": 20,
        "title": "The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples",
        "category": "lifestyle",
        "subcategory": "cost-finance",
        "excerpt": "Realistic budget breakdown confronting the cost-benefit miscalculation narrative."
    },
    {
        "id": 21,
        "title": "Advanced Tax Planning for IT Professionals in Karnataka",
        "category": "lifestyle",
        "subcategory": "cost-finance",
        "excerpt": "Optimize your tax strategy with state-specific considerations and investment options."
    },
    {
        "id": 22,
        "title": "Why People Leave Bangalore: An Honest Look at the Challenges",
        "category": "lifestyle",
        "subcategory": "cost-finance",
        "excerpt": "Understanding the factors that drive people away from India's Silicon Valley."
    },
    {
        "id": 23,
        "title": "The South Indian Breakfast Trail: 10 Legendary Eateries",
        "category": "lifestyle",
        "subcategory": "culture-social",
        "excerpt": "Discover authentic South Indian breakfast spots beyond the typical hotel chains."
    },
    {
        "id": 24,
        "title": "Bangalore's Microbrewery Culture: Top 10 Craft Beer Spots",
        "category": "lifestyle",
        "subcategory": "culture-social",
        "excerpt": "Explore the city's thriving craft beer scene with our curated brewery guide."
    },
    {
        "id": 25,
        "title": "Swalpa Adjust Maadi: 15 Essential Kannada Phrases for Daily Life",
        "category": "lifestyle",
        "subcategory": "culture-social",
        "excerpt": "Bridge the language gap with essential Kannada phrases for better local interactions."
    },
    {
        "id": 26,
        "title": "From Fresher to Team Lead: Navigating IT Job Market in Bangalore",
        "category": "lifestyle",
        "subcategory": "work-career",
        "excerpt": "Career progression strategies for IT professionals in Bangalore."
    },
    {
        "id": 27,
        "title": "Healthcare in Bangalore: Multi-Speciality Hospitals vs Local Clinics",
        "category": "lifestyle",
        "subcategory": "health-wellness",
        "excerpt": "Navigate Bangalore's healthcare system with informed choices."
    },

    # Tourism & Exploration (3 articles)
    {
        "id": 28,
        "title": "Weekend Getaways from Bangalore (Under 150 Kms)",
        "category": "tourism",
        "subcategory": "weekend-getaways",
        "excerpt": "Escape the city chaos with these nearby destinations perfect for quick weekend trips."
    },
    {
        "id": 29,
        "title": "Long-Distance Weekend Getaways from Bangalore (300+ Kms)",
        "category": "tourism",
        "subcategory": "weekend-getaways",
        "excerpt": "Extended weekend adventures to hill stations, beaches, and historical destinations."
    },
    {
        "id": 30,
        "title": "The Ultimate Guide to Bangalore's Parks: Beyond Lalbagh and Cubbon Park",
        "category": "tourism",
        "subcategory": "city-exploration",
        "excerpt": "Discover hidden green spaces and urban oases for mental well-being and recreation."
    }
]

async def generate_seo_optimized_article(article_data, api_key):
    """Generate SEO-optimized 2000+ word article with proper H1/H2/H3 structure"""
    
    # Initialize Gemini chat
    chat = LlmChat(
        api_key=api_key,
        session_id=f"seo_article_{article_data['id']}",
        system_message="""You are an expert SEO content writer specializing in comprehensive guides about living in Bangalore. 
        You create detailed, well-structured articles that rank well in search engines while providing genuine value to readers.
        Focus on practical, actionable advice with specific Bangalore insights."""
    ).with_model("gemini", "gemini-1.5-flash").with_max_tokens(8192)
    
    prompt = f"""
    Write a comprehensive, SEO-optimized article of 2000+ words on: "{article_data['title']}"
    
    SEO REQUIREMENTS:
    1. Use ONLY ONE H1 tag for the main title
    2. Use H2 tags for major sections (5-7 sections)
    3. Use H3 tags for subsections within H2 sections
    4. Keep paragraphs SHORT - only 1-2 sentences per paragraph
    5. Use bullet points and numbered lists for better readability
    6. Include relevant keywords naturally throughout
    7. Add a FAQ section at the end with H3 "Frequently Asked Questions"
    8. Include a conclusion with actionable next steps
    
    CONTENT STRUCTURE:
    1. Introduction (150-200 words)
    2. Main Problem/Challenge Overview (200-250 words)
    3. Detailed Solutions/Guide (1200-1400 words across 4-5 H2 sections)
    4. Pro Tips & Insider Knowledge (200-250 words)
    5. Common Mistakes to Avoid (200-250 words)
    6. FAQ Section (150-200 words)
    7. Conclusion & Next Steps (100-150 words)
    
    BANGALORE-SPECIFIC REQUIREMENTS:
    - Include specific locations, neighborhoods, costs, and timeframes
    - Reference local services, apps, and resources
    - Address infrastructure challenges (traffic, power, water)
    - Mention cultural aspects and language considerations
    - Include government processes and documentation
    - Provide realistic cost breakdowns in INR
    
    WRITING STYLE:
    - Pragmatic, supportive, and empathetic tone
    - Short, punchy paragraphs (1-2 sentences each)
    - Use transition words for better flow
    - Include specific examples and case studies
    - Address the "Bangalore Paradox" concept
    - Write for IT professionals and migrants
    
    OUTPUT FORMAT:
    Return clean HTML with proper heading tags (h1, h2, h3), paragraphs, lists, and emphasis.
    Do not include any markdown formatting or code blocks.
    Start directly with the H1 title.
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
    
    print("🚀 Starting SEO-optimized article generation...")
    print(f"📝 Generating {len(KEY_ARTICLES)} comprehensive 2000+ word articles")
    
    articles_with_content = []
    
    for i, article in enumerate(KEY_ARTICLES, 1):
        print(f"⏳ Generating article {i}/30: {article['title'][:50]}...")
        
        content = await generate_seo_optimized_article(article, api_key)
        
        if content:
            word_count = len(content.split())
            article_complete = {
                **article,
                "content": content,
                "readTime": f"{word_count // 200 + 1} min read",
                "publishDate": f"2024-0{((i-1) % 12) + 1:02d}-{((i-1) % 28) + 1:02d}",
                "featured": i <= 8,  # First 8 articles are featured
                "wordCount": word_count
            }
            articles_with_content.append(article_complete)
            print(f"✅ Generated {word_count} words for article {i}")
        else:
            print(f"❌ Failed to generate article {i}")
        
        # Delay to respect rate limits
        await asyncio.sleep(4)
    
    # Save to JSON file
    output_file = '/app/frontend/src/data/seo_articles.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles_with_content, f, indent=2, ensure_ascii=False)
    
    print(f"🎉 Successfully generated {len(articles_with_content)} SEO-optimized articles!")
    print(f"📁 Articles saved to: {output_file}")
    
    # Print statistics
    total_words = sum(article['wordCount'] for article in articles_with_content)
    avg_words = total_words // len(articles_with_content) if articles_with_content else 0
    
    print(f"\n📊 STATISTICS:")
    print(f"   Total articles: {len(articles_with_content)}")
    print(f"   Total words: {total_words:,}")
    print(f"   Average words per article: {avg_words:,}")
    print(f"   Featured articles: {sum(1 for a in articles_with_content if a.get('featured', False))}")
    print(f"   Articles over 2000 words: {sum(1 for a in articles_with_content if a['wordCount'] >= 2000)}")

if __name__ == "__main__":
    asyncio.run(main())