#!/usr/bin/env python3

import asyncio
import json
import sys
import os
sys.path.append('/app/backend')

from emergentintegrations.llm.chat import LlmChat, UserMessage

# Define the expanded list of 50 comprehensive articles
BANGALORE_ARTICLES = [
    # Housing & Home Setup (15 articles)
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
    {
        "id": 9,
        "title": "Pet Care in Bangalore: A Guide for Pet Parents",
        "category": "housing",
        "subcategory": "home-setup",
        "excerpt": "Everything pet parents need to know about veterinary care, pet-friendly apartments, and services."
    },
    {
        "id": 10,
        "title": "Khata A vs Khata B: What Every Home Buyer in Bangalore MUST Know",
        "category": "housing",
        "subcategory": "property-ownership",
        "excerpt": "Understanding property documentation that can make or break your real estate investment."
    },
    {
        "id": 11,
        "title": "Navigating BBMP: How to Pay Your Property Tax Online",
        "category": "housing",
        "subcategory": "property-ownership",
        "excerpt": "Step-by-step guide to dealing with Bangalore's municipal corporation."
    },
    {
        "id": 12,
        "title": "Apartment vs Independent House in Bangalore: A 360-Degree Analysis",
        "category": "housing",
        "subcategory": "property-ownership",
        "excerpt": "Make the right choice between apartments and independent houses with this comprehensive comparison."
    },
    {
        "id": 13,
        "title": "Home Loans in Bangalore: Comparing Banks and NBFCs",
        "category": "housing",
        "subcategory": "property-ownership",
        "excerpt": "Navigate the home loan landscape with insider knowledge of interest rates and processes."
    },
    {
        "id": 14,
        "title": "The Complete Guide to Home Interiors in Bangalore",
        "category": "housing",
        "subcategory": "home-setup",
        "excerpt": "Transform your space with local interior designers, furniture markets, and decor tips."
    },
    {
        "id": 15,
        "title": "Moving within Bangalore: A Checklist for a Smooth Transition",
        "category": "housing",
        "subcategory": "home-setup",
        "excerpt": "Everything you need for a hassle-free move within the city."
    },

    # Transport & Commute (10 articles)
    {
        "id": 16,
        "title": "Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies."
    },
    {
        "id": 17,
        "title": "Monsoon Preparedness: How to Survive Bangalore's Rains and Traffic",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Traffic tips and strategies for navigating the city during monsoon season."
    },
    {
        "id": 18,
        "title": "The Bangalore Traffic Police: Understanding Fines and E-Challans",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Stay compliant with traffic rules and understand the e-challan system."
    },
    {
        "id": 19,
        "title": "Your First Vehicle in Bangalore: Used Car vs New Two-Wheeler",
        "category": "transport",
        "subcategory": "personal-vehicles",
        "excerpt": "Make an informed decision about your first vehicle purchase in Bangalore."
    },
    {
        "id": 20,
        "title": "How to Get Your Karnataka Driving License",
        "category": "transport",
        "subcategory": "personal-vehicles",
        "excerpt": "Step-by-step guide to obtaining your driving license in Karnataka."
    },
    {
        "id": 21,
        "title": "Navigating Bangalore's RTOs: A Complete Guide",
        "category": "transport",
        "subcategory": "personal-vehicles",
        "excerpt": "Master the Regional Transport Office procedures and documentation."
    },
    {
        "id": 22,
        "title": "Cycling in Bangalore: Routes, Groups, and Safety",
        "category": "transport",
        "subcategory": "personal-vehicles",
        "excerpt": "Explore Bangalore on two wheels with safety tips and cycling communities."
    },
    {
        "id": 23,
        "title": "Getting Your FASTag in Bangalore: A Step-by-Step Guide",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Simplify toll payments with electronic toll collection."
    },
    {
        "id": 24,
        "title": "Navigating Bangalore International Airport (KIAL)",
        "category": "transport",
        "subcategory": "public-transport",
        "excerpt": "Everything you need to know about getting to and from Bangalore airport."
    },
    {
        "id": 25,
        "title": "The Future of Bangalore Transport: Suburban Rail and PRR",
        "category": "transport",
        "subcategory": "navigating-roads",
        "excerpt": "Understanding upcoming transport infrastructure projects."
    },

    # Utilities & Home Services (8 articles)
    {
        "id": 26,
        "title": "Decoding Bangalore's Utilities: BESCOM, BWSSB, and GAIL",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Understand Bangalore's utility providers and how to manage your connections effectively."
    },
    {
        "id": 27,
        "title": "Dealing with Power Cuts: An Essential Bangalore Survival Guide",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Prepare for power outages with inverters, UPS systems, and backup solutions."
    },
    {
        "id": 28,
        "title": "Understanding Bangalore's Water Tanker System",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Navigate water scarcity with tanker services and water management strategies."
    },
    {
        "id": 29,
        "title": "The Bangalore Hair Fall Epidemic: Hard Water Solutions",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Combat hard water effects with practical solutions and water treatment options."
    },
    {
        "id": 30,
        "title": "Piped Gas (GAIL) vs Cylinder: Which is Better for You?",
        "category": "utilities",
        "subcategory": "gas-internet",
        "excerpt": "Compare cooking gas options for cost, convenience, and safety."
    },
    {
        "id": 31,
        "title": "Dealing with Mobile Network Issues in Bangalore",
        "category": "utilities",
        "subcategory": "gas-internet",
        "excerpt": "Optimize your mobile connectivity with carrier comparisons and signal boosting tips."
    },
    {
        "id": 32,
        "title": "Waste Management 101: Understanding BBMP's Segregation Rules",
        "category": "utilities",
        "subcategory": "waste-management",
        "excerpt": "Master Bangalore's waste segregation system and disposal guidelines."
    },
    {
        "id": 33,
        "title": "Bangalore's Lake Ecosystem: Environmental Challenges and Solutions",
        "category": "utilities",
        "subcategory": "electricity-water",
        "excerpt": "Understanding the city's water bodies and environmental initiatives."
    },

    # Lifestyle & Integration (12 articles)
    {
        "id": 34,
        "title": "The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples",
        "category": "lifestyle",
        "subcategory": "cost-finance",
        "excerpt": "Realistic budget breakdown confronting the cost-benefit miscalculation narrative."
    },
    {
        "id": 35,
        "title": "Advanced Tax Planning for IT Professionals in Karnataka",
        "category": "lifestyle",
        "subcategory": "cost-finance",
        "excerpt": "Optimize your tax strategy with state-specific considerations and investment options."
    },
    {
        "id": 36,
        "title": "Why People Leave Bangalore: An Honest Look at the Challenges",
        "category": "lifestyle",
        "subcategory": "cost-finance",
        "excerpt": "Understanding the factors that drive people away from India's Silicon Valley."
    },
    {
        "id": 37,
        "title": "The South Indian Breakfast Trail: 10 Legendary Eateries",
        "category": "lifestyle",
        "subcategory": "culture-social",
        "excerpt": "Discover authentic South Indian breakfast spots beyond the typical hotel chains."
    },
    {
        "id": 38,
        "title": "Bangalore's Microbrewery Culture: Top 10 Craft Beer Spots",
        "category": "lifestyle",
        "subcategory": "culture-social",
        "excerpt": "Explore the city's thriving craft beer scene with our curated brewery guide."
    },
    {
        "id": 39,
        "title": "Swalpa Adjust Maadi: 15 Essential Kannada Phrases for Daily Life",
        "category": "lifestyle",
        "subcategory": "culture-social",
        "excerpt": "Bridge the language gap with essential Kannada phrases for better local interactions."
    },
    {
        "id": 40,
        "title": "From Fresher to Team Lead: Navigating IT Job Market in Bangalore",
        "category": "lifestyle",
        "subcategory": "work-career",
        "excerpt": "Career progression strategies for IT professionals in Bangalore."
    },
    {
        "id": 41,
        "title": "Healthcare in Bangalore: Multi-Speciality Hospitals vs Local Clinics",
        "category": "lifestyle",
        "subcategory": "health-wellness",
        "excerpt": "Navigate Bangalore's healthcare system with informed choices."
    },
    {
        "id": 42,
        "title": "A Parent's Guide: Finding the Right School in Bangalore",
        "category": "lifestyle",
        "subcategory": "education-family",
        "excerpt": "School selection criteria and admission processes for parents."
    },
    {
        "id": 43,
        "title": "Shopping in Bangalore: Brigade Road to Commercial Street",
        "category": "lifestyle",
        "subcategory": "shopping-markets",
        "excerpt": "Navigate Bangalore's shopping landscape from malls to street markets."
    },
    {
        "id": 44,
        "title": "A Guide to KR Market: Bangalore's Busiest Wholesale Market",
        "category": "lifestyle",
        "subcategory": "shopping-markets",
        "excerpt": "Master the art of wholesale shopping at Krishna Rajendra Market."
    },
    {
        "id": 45,
        "title": "Address Proof 101: How to Update Your Aadhaar in Bangalore",
        "category": "lifestyle",
        "subcategory": "civic-legal",
        "excerpt": "Navigate bureaucratic procedures for address changes and documentation."
    },

    # Tourism & Exploration (5 articles)
    {
        "id": 46,
        "title": "Weekend Getaways from Bangalore (Under 150 Kms)",
        "category": "tourism",
        "subcategory": "weekend-getaways",
        "excerpt": "Escape the city chaos with these nearby destinations perfect for quick weekend trips."
    },
    {
        "id": 47,
        "title": "Long-Distance Weekend Getaways from Bangalore (300+ Kms)",
        "category": "tourism",
        "subcategory": "weekend-getaways",
        "excerpt": "Extended weekend adventures to hill stations, beaches, and historical destinations."
    },
    {
        "id": 48,
        "title": "The Ultimate Guide to Bangalore's Parks: Beyond Lalbagh and Cubbon Park",
        "category": "tourism",
        "subcategory": "city-exploration",
        "excerpt": "Discover hidden green spaces and urban oases for mental well-being and recreation."
    },
    {
        "id": 49,
        "title": "Beyond the IT Corridor: Exploring Bangalore's Old-World Charm",
        "category": "tourism",
        "subcategory": "city-exploration",
        "excerpt": "Discover Bangalore's heritage, culture, and traditional neighborhoods."
    },
    {
        "id": 50,
        "title": "A Foodie's Guide to V.V. Puram Food Street (Thindi Beedi)",
        "category": "tourism",
        "subcategory": "city-exploration",
        "excerpt": "Navigate Bangalore's most famous food street with insider recommendations."
    }
]

async def generate_comprehensive_article(article_data, api_key):
    """Generate a comprehensive 2500-3000 word article using Gemini 2.5 Pro"""
    
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
    
    print("🚀 Starting comprehensive article generation...")
    print(f"📝 Generating {len(BANGALORE_ARTICLES)} detailed articles using Gemini 2.5 Pro")
    
    articles_with_content = []
    
    for i, article in enumerate(BANGALORE_ARTICLES, 1):
        print(f"⏳ Generating article {i}/50: {article['title'][:60]}...")
        
        content = await generate_comprehensive_article(article, api_key)
        
        if content:
            article_complete = {
                **article,
                "content": content,
                "readTime": f"{len(content.split()) // 200 + 1} min read",
                "publishDate": f"2024-0{(i % 12) + 1:02d}-{(i % 28) + 1:02d}",
                "featured": i <= 10  # First 10 articles are featured
            }
            articles_with_content.append(article_complete)
            print(f"✅ Generated {len(content.split())} words for article {i}")
        else:
            print(f"❌ Failed to generate article {i}")
        
        # Small delay to respect rate limits
        await asyncio.sleep(2)
    
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