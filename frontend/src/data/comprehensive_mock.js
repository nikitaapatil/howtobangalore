// Comprehensive mock data for How to Bangalore website with 50 articles
import generatedArticles from './generated_articles.json';

// Create a mapping of generated articles by ID
const generatedMap = {};
generatedArticles.forEach(article => {
  generatedMap[article.id] = article;
});

// Helper function to get article content
const getArticleContent = (id, title) => {
  if (generatedMap[id]) {
    return generatedMap[id].content.replace(/```html\n?/, '').replace(/\n?```$/, '');
  }
  
  // Generate placeholder content for articles not yet generated
  return `
    <div class="prose max-w-none">
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Welcome to this comprehensive guide on ${title.toLowerCase()}. This article is designed to provide you with practical, actionable advice based on real experiences of living in Bangalore.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding the Challenge</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Bangalore presents unique challenges that require insider knowledge to navigate successfully. Whether you're a newcomer or a long-time resident, understanding the nuances of city life can make a significant difference in your daily experience.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Solutions</h2>
      <p class="text-gray-700 leading-relaxed mb-4">
        Based on extensive research and real-world experience, here are the key strategies that work:
      </p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Research thoroughly before making any decisions</li>
        <li>Connect with local communities and networks</li>
        <li>Keep realistic expectations about costs and timelines</li>
        <li>Always have backup plans for common issues</li>
        <li>Leverage technology and online resources effectively</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Pitfalls to Avoid</h2>
      <p class="text-gray-700 leading-relaxed mb-4">
        Many newcomers fall into these traps. Here's how to avoid them:
      </p>
      <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
        <li>Don't underestimate the importance of location in your decisions</li>
        <li>Avoid making financial commitments without proper verification</li>
        <li>Don't ignore the local language and cultural aspects</li>
        <li>Never compromise on safety and security measures</li>
      </ol>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Expert Tips</h2>
      <div class="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
        <p class="text-gray-700 leading-relaxed">
          <strong>Pro Tip:</strong> The key to succeeding in Bangalore is to balance ambition with pragmatism. Set realistic expectations while staying focused on your long-term goals.
        </p>
      </div>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Next Steps</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Now that you have this foundational knowledge, you can move forward with confidence. Remember that every situation is unique, so adapt these guidelines to your specific circumstances.
      </p>
      
      <p class="text-gray-700 leading-relaxed">
        This comprehensive approach will help you navigate the complexities of Bangalore life more effectively. For more detailed guides on specific topics, explore our other articles in this category.
      </p>
    </div>
  `;
};

export const categories = [
  {
    id: 'housing',
    name: 'Housing & Home Setup',
    description: 'Everything about finding, setting up, and managing your home in Bangalore',
    icon: 'Home',
    subcategories: [
      {
        id: 'finding-home',
        name: 'Finding Your Home',
        posts: [
          {
            id: 1,
            title: 'The Ultimate Guide to Renting in Bangalore: Broker vs. Online Portals',
            excerpt: 'Navigate the complex world of Bangalore rentals with insider tips on brokers, deposits, and negotiation tactics.',
            content: getArticleContent(1, 'The Ultimate Guide to Renting in Bangalore: Broker vs. Online Portals'),
            readTime: '12 min read',
            publishDate: '2024-01-15',
            featured: true
          },
          {
            id: 2,
            title: 'Registering Your Rental Agreement in Bangalore: Is it Necessary?',
            excerpt: 'Understanding the legal requirements and practical implications of rental agreement registration.',
            content: getArticleContent(2, 'Registering Your Rental Agreement in Bangalore: Is it Necessary?'),
            readTime: '8 min read',
            publishDate: '2024-01-10'
          },
          {
            id: 3,
            title: 'Understanding the PG (Paying Guest) Culture in Bangalore',
            excerpt: 'A comprehensive guide to PG accommodations - costs, benefits, and what to expect.',
            content: getArticleContent(3, 'Understanding the PG (Paying Guest) Culture in Bangalore'),
            readTime: '10 min read',
            publishDate: '2024-01-05'
          },
          {
            id: 4,
            title: 'Solo Living in Bangalore: A Guide for Bachelors and Bachelorettes',
            excerpt: 'Tips and strategies for independent living in the Silicon Valley of India.',
            content: getArticleContent(4, 'Solo Living in Bangalore: A Guide for Bachelors and Bachelorettes'),
            readTime: '9 min read',
            publishDate: '2024-01-01'
          }
        ]
      },
      {
        id: 'choosing-neighborhood',
        name: 'Choosing Your Neighborhood',
        posts: [
          {
            id: 5,
            title: 'Choosing Your Bangalore Neighbourhood: A Techie\'s Guide to Living Near Tech Parks',
            excerpt: 'Balance commute time, rental costs, and social infrastructure with our comprehensive neighborhood analysis.',
            content: getArticleContent(5, 'Choosing Your Bangalore Neighbourhood: A Techie\'s Guide to Living Near Tech Parks'),
            readTime: '15 min read',
            publishDate: '2024-01-20',
            featured: true
          },
          {
            id: 6,
            title: 'Koramangala vs HSR Layout vs Indiranagar: The Ultimate Neighborhood Comparison',
            excerpt: 'Detailed analysis of Bangalore\'s most popular residential areas for young professionals.',
            content: getArticleContent(6, 'Koramangala vs HSR Layout vs Indiranagar: The Ultimate Neighborhood Comparison'),
            readTime: '14 min read',
            publishDate: '2024-01-18'
          }
        ]
      },
      {
        id: 'home-setup',
        name: 'Setting Up Your Home',
        posts: [
          {
            id: 7,
            title: 'The Best Broadband for Your Home: ACT vs JioFiber vs Airtel',
            excerpt: 'Compare internet providers to find the best connectivity solution for your work-from-home setup.',
            content: getArticleContent(7, 'The Best Broadband for Your Home: ACT vs JioFiber vs Airtel'),
            readTime: '11 min read',
            publishDate: '2024-01-25'
          },
          {
            id: 8,
            title: 'A Guide to Domestic Help in Bangalore: Finding, Vetting, and Paying',
            excerpt: 'Navigate the domestic help ecosystem with practical advice on hiring and managing household staff.',
            content: getArticleContent(8, 'A Guide to Domestic Help in Bangalore: Finding, Vetting, and Paying'),
            readTime: '13 min read',
            publishDate: '2024-01-18'
          },
          {
            id: 9,
            title: 'Pet Care in Bangalore: A Guide for Pet Parents',
            excerpt: 'Everything pet parents need to know about veterinary care, pet-friendly apartments, and services.',
            content: getArticleContent(9, 'Pet Care in Bangalore: A Guide for Pet Parents'),
            readTime: '10 min read',
            publishDate: '2024-01-12'
          },
          {
            id: 10,
            title: 'The Complete Guide to Home Interiors in Bangalore',
            excerpt: 'Transform your space with local interior designers, furniture markets, and decor tips.',
            content: getArticleContent(10, 'The Complete Guide to Home Interiors in Bangalore'),
            readTime: '12 min read',
            publishDate: '2024-01-08'
          },
          {
            id: 11,
            title: 'Moving within Bangalore: A Checklist for a Smooth Transition',
            excerpt: 'Everything you need for a hassle-free move within the city.',
            content: getArticleContent(11, 'Moving within Bangalore: A Checklist for a Smooth Transition'),
            readTime: '9 min read',
            publishDate: '2024-01-03'
          }
        ]
      },
      {
        id: 'property-ownership',
        name: 'Property Ownership',
        posts: [
          {
            id: 12,
            title: 'Khata A vs Khata B: What Every Home Buyer in Bangalore MUST Know',
            excerpt: 'Understanding property documentation that can make or break your real estate investment.',
            content: getArticleContent(12, 'Khata A vs Khata B: What Every Home Buyer in Bangalore MUST Know'),
            readTime: '11 min read',
            publishDate: '2024-01-22'
          },
          {
            id: 13,
            title: 'Navigating BBMP: How to Pay Your Property Tax Online',
            excerpt: 'Step-by-step guide to dealing with Bangalore\'s municipal corporation.',
            content: getArticleContent(13, 'Navigating BBMP: How to Pay Your Property Tax Online'),
            readTime: '8 min read',
            publishDate: '2024-01-16'
          },
          {
            id: 14,
            title: 'Apartment vs Independent House in Bangalore: A 360-Degree Analysis',
            excerpt: 'Make the right choice between apartments and independent houses with this comprehensive comparison.',
            content: getArticleContent(14, 'Apartment vs Independent House in Bangalore: A 360-Degree Analysis'),
            readTime: '13 min read',
            publishDate: '2024-01-11'
          },
          {
            id: 15,
            title: 'Home Loans in Bangalore: Comparing Banks and NBFCs',
            excerpt: 'Navigate the home loan landscape with insider knowledge of interest rates and processes.',
            content: getArticleContent(15, 'Home Loans in Bangalore: Comparing Banks and NBFCs'),
            readTime: '12 min read',
            publishDate: '2024-01-06'
          }
        ]
      }
    ]
  },
  {
    id: 'transport',
    name: 'Transport & Commute',
    description: 'Master Bangalore\'s complex transportation system and optimize your daily commute',
    icon: 'Car',
    subcategories: [
      {
        id: 'navigating-roads',
        name: 'Navigating Bangalore\'s Roads',
        posts: [
          {
            id: 16,
            title: 'Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing',
            excerpt: 'Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies.',
            content: getArticleContent(16, 'Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing'),
            readTime: '14 min read',
            publishDate: '2024-02-01',
            featured: true
          },
          {
            id: 17,
            title: 'Monsoon Preparedness: How to Survive Bangalore\'s Rains and Traffic',
            excerpt: 'Traffic tips and strategies for navigating the city during monsoon season.',
            content: getArticleContent(17, 'Monsoon Preparedness: How to Survive Bangalore\'s Rains and Traffic'),
            readTime: '9 min read',
            publishDate: '2024-01-30'
          },
          {
            id: 18,
            title: 'The Bangalore Traffic Police: Understanding Fines and E-Challans',
            excerpt: 'Stay compliant with traffic rules and understand the e-challan system.',
            content: getArticleContent(18, 'The Bangalore Traffic Police: Understanding Fines and E-Challans'),
            readTime: '7 min read',
            publishDate: '2024-01-28'
          },
          {
            id: 19,
            title: 'Getting Your FASTag in Bangalore: A Step-by-Step Guide',
            excerpt: 'Simplify toll payments with electronic toll collection.',
            content: getArticleContent(19, 'Getting Your FASTag in Bangalore: A Step-by-Step Guide'),
            readTime: '6 min read',
            publishDate: '2024-01-24'
          },
          {
            id: 20,
            title: 'The Future of Bangalore Transport: Suburban Rail and PRR',
            excerpt: 'Understanding upcoming transport infrastructure projects.',
            content: getArticleContent(20, 'The Future of Bangalore Transport: Suburban Rail and PRR'),
            readTime: '10 min read',
            publishDate: '2024-01-19'
          }
        ]
      },
      {
        id: 'personal-vehicles',
        name: 'Personal Vehicles',
        posts: [
          {
            id: 21,
            title: 'Your First Vehicle in Bangalore: Used Car vs New Two-Wheeler',
            excerpt: 'Make an informed decision about your first vehicle purchase in Bangalore.',
            content: getArticleContent(21, 'Your First Vehicle in Bangalore: Used Car vs New Two-Wheeler'),
            readTime: '12 min read',
            publishDate: '2024-02-05'
          },
          {
            id: 22,
            title: 'How to Get Your Karnataka Driving License',
            excerpt: 'Step-by-step guide to obtaining your driving license in Karnataka.',
            content: getArticleContent(22, 'How to Get Your Karnataka Driving License'),
            readTime: '10 min read',
            publishDate: '2024-02-03'
          },
          {
            id: 23,
            title: 'Navigating Bangalore\'s RTOs: A Complete Guide',
            excerpt: 'Master the Regional Transport Office procedures and documentation.',
            content: getArticleContent(23, 'Navigating Bangalore\'s RTOs: A Complete Guide'),
            readTime: '9 min read',
            publishDate: '2024-01-31'
          },
          {
            id: 24,
            title: 'Cycling in Bangalore: Routes, Groups, and Safety',
            excerpt: 'Explore Bangalore on two wheels with safety tips and cycling communities.',
            content: getArticleContent(24, 'Cycling in Bangalore: Routes, Groups, and Safety'),
            readTime: '11 min read',
            publishDate: '2024-01-27'
          }
        ]
      },
      {
        id: 'public-transport',
        name: 'Public Transport',
        posts: [
          {
            id: 25,
            title: 'Navigating Bangalore International Airport (KIAL)',
            excerpt: 'Everything you need to know about getting to and from Bangalore airport.',
            content: getArticleContent(25, 'Navigating Bangalore International Airport (KIAL)'),
            readTime: '8 min read',
            publishDate: '2024-01-23'
          }
        ]
      }
    ]
  },
  {
    id: 'utilities',
    name: 'Utilities & Home Services',
    description: 'Navigate BESCOM, BWSSB, and other essential utilities like a pro',
    icon: 'Zap',
    subcategories: [
      {
        id: 'electricity-water',
        name: 'Electricity & Water',
        posts: [
          {
            id: 26,
            title: 'Decoding Bangalore\'s Utilities: BESCOM, BWSSB, and GAIL',
            excerpt: 'Understand Bangalore\'s utility providers and how to manage your connections effectively.',
            content: getArticleContent(26, 'Decoding Bangalore\'s Utilities: BESCOM, BWSSB, and GAIL'),
            readTime: '13 min read',
            publishDate: '2024-02-10',
            featured: true
          },
          {
            id: 27,
            title: 'Dealing with Power Cuts: An Essential Bangalore Survival Guide',
            excerpt: 'Prepare for power outages with inverters, UPS systems, and backup solutions.',
            content: getArticleContent(27, 'Dealing with Power Cuts: An Essential Bangalore Survival Guide'),
            readTime: '11 min read',
            publishDate: '2024-02-08'
          },
          {
            id: 28,
            title: 'Understanding Bangalore\'s Water Tanker System',
            excerpt: 'Navigate water scarcity with tanker services and water management strategies.',
            content: getArticleContent(28, 'Understanding Bangalore\'s Water Tanker System'),
            readTime: '9 min read',
            publishDate: '2024-02-06'
          },
          {
            id: 29,
            title: 'The Bangalore Hair Fall Epidemic: Hard Water Solutions',
            excerpt: 'Combat hard water effects with practical solutions and water treatment options.',
            content: getArticleContent(29, 'The Bangalore Hair Fall Epidemic: Hard Water Solutions'),
            readTime: '10 min read',
            publishDate: '2024-02-04'
          },
          {
            id: 30,
            title: 'Bangalore\'s Lake Ecosystem: Environmental Challenges and Solutions',
            excerpt: 'Understanding the city\'s water bodies and environmental initiatives.',
            content: getArticleContent(30, 'Bangalore\'s Lake Ecosystem: Environmental Challenges and Solutions'),
            readTime: '12 min read',
            publishDate: '2024-02-02'
          }
        ]
      },
      {
        id: 'gas-internet',
        name: 'Gas & Internet',
        posts: [
          {
            id: 31,
            title: 'Piped Gas (GAIL) vs Cylinder: Which is Better for You?',
            excerpt: 'Compare cooking gas options for cost, convenience, and safety.',
            content: getArticleContent(31, 'Piped Gas (GAIL) vs Cylinder: Which is Better for You?'),
            readTime: '8 min read',
            publishDate: '2024-01-29'
          },
          {
            id: 32,
            title: 'Dealing with Mobile Network Issues in Bangalore',
            excerpt: 'Optimize your mobile connectivity with carrier comparisons and signal boosting tips.',
            content: getArticleContent(32, 'Dealing with Mobile Network Issues in Bangalore'),
            readTime: '7 min read',
            publishDate: '2024-01-25'
          }
        ]
      },
      {
        id: 'waste-management',
        name: 'Waste Management',
        posts: [
          {
            id: 33,
            title: 'Waste Management 101: Understanding BBMP\'s Segregation Rules',
            excerpt: 'Master Bangalore\'s waste segregation system and disposal guidelines.',
            content: getArticleContent(33, 'Waste Management 101: Understanding BBMP\'s Segregation Rules'),
            readTime: '6 min read',
            publishDate: '2024-01-21'
          }
        ]
      }
    ]
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Integration',
    description: 'Build a fulfilling life in Bangalore - from career growth to cultural integration',
    icon: 'Users',
    subcategories: [
      {
        id: 'cost-finance',
        name: 'Cost of Living & Finance',
        posts: [
          {
            id: 34,
            title: 'The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples',
            excerpt: 'Realistic budget breakdown confronting the cost-benefit miscalculation narrative.',
            content: getArticleContent(34, 'The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples'),
            readTime: '16 min read',
            publishDate: '2024-02-15',
            featured: true
          },
          {
            id: 35,
            title: 'Advanced Tax Planning for IT Professionals in Karnataka',
            excerpt: 'Optimize your tax strategy with state-specific considerations and investment options.',
            content: getArticleContent(35, 'Advanced Tax Planning for IT Professionals in Karnataka'),
            readTime: '14 min read',
            publishDate: '2024-02-12'
          },
          {
            id: 36,
            title: 'Why People Leave Bangalore: An Honest Look at the Challenges',
            excerpt: 'Understanding the factors that drive people away from India\'s Silicon Valley.',
            content: getArticleContent(36, 'Why People Leave Bangalore: An Honest Look at the Challenges'),
            readTime: '11 min read',
            publishDate: '2024-02-09'
          }
        ]
      },
      {
        id: 'culture-social',
        name: 'Culture & Social Life',
        posts: [
          {
            id: 37,
            title: 'The South Indian Breakfast Trail: 10 Legendary Eateries',
            excerpt: 'Discover authentic South Indian breakfast spots beyond the typical hotel chains.',
            content: getArticleContent(37, 'The South Indian Breakfast Trail: 10 Legendary Eateries'),
            readTime: '12 min read',
            publishDate: '2024-02-18'
          },
          {
            id: 38,
            title: 'Bangalore\'s Microbrewery Culture: Top 10 Craft Beer Spots',
            excerpt: 'Explore the city\'s thriving craft beer scene with our curated brewery guide.',
            content: getArticleContent(38, 'Bangalore\'s Microbrewery Culture: Top 10 Craft Beer Spots'),
            readTime: '11 min read',
            publishDate: '2024-02-16'
          },
          {
            id: 39,
            title: 'Swalpa Adjust Maadi: 15 Essential Kannada Phrases for Daily Life',
            excerpt: 'Bridge the language gap with essential Kannada phrases for better local interactions.',
            content: getArticleContent(39, 'Swalpa Adjust Maadi: 15 Essential Kannada Phrases for Daily Life'),
            readTime: '8 min read',
            publishDate: '2024-02-14'
          },
          {
            id: 40,
            title: 'Celebrating Festivals in Bangalore: From Dasara to Christmas',
            excerpt: 'Experience Bangalore\'s diverse festival culture and community celebrations.',
            content: getArticleContent(40, 'Celebrating Festivals in Bangalore: From Dasara to Christmas'),
            readTime: '10 min read',
            publishDate: '2024-02-11'
          }
        ]
      },
      {
        id: 'work-career',
        name: 'Work & Career',
        posts: [
          {
            id: 41,
            title: 'From Fresher to Team Lead: Navigating IT Job Market in Bangalore',
            excerpt: 'Career progression strategies for IT professionals in Bangalore.',
            content: getArticleContent(41, 'From Fresher to Team Lead: Navigating IT Job Market in Bangalore'),
            readTime: '13 min read',
            publishDate: '2024-02-13'
          },
          {
            id: 42,
            title: 'The Gig Economy in Bangalore: Side Hustles for Tech Professionals',
            excerpt: 'Explore freelancing and side income opportunities in Bangalore\'s tech ecosystem.',
            content: getArticleContent(42, 'The Gig Economy in Bangalore: Side Hustles for Tech Professionals'),
            readTime: '11 min read',
            publishDate: '2024-02-07'
          }
        ]
      },
      {
        id: 'health-wellness',
        name: 'Health & Wellness',
        posts: [
          {
            id: 43,
            title: 'Healthcare in Bangalore: Multi-Speciality Hospitals vs Local Clinics',
            excerpt: 'Navigate Bangalore\'s healthcare system with informed choices.',
            content: getArticleContent(43, 'Healthcare in Bangalore: Multi-Speciality Hospitals vs Local Clinics'),
            readTime: '12 min read',
            publishDate: '2024-02-05'
          },
          {
            id: 44,
            title: 'Bangalore for Fitness Freaks: Best Gyms, Yoga Studios, and Running Tracks',
            excerpt: 'Stay fit in Bangalore with our comprehensive guide to fitness facilities.',
            content: getArticleContent(44, 'Bangalore for Fitness Freaks: Best Gyms, Yoga Studios, and Running Tracks'),
            readTime: '10 min read',
            publishDate: '2024-01-26'
          }
        ]
      },
      {
        id: 'education-family',
        name: 'Education & Family',
        posts: [
          {
            id: 45,
            title: 'A Parent\'s Guide: Finding the Right School in Bangalore',
            excerpt: 'School selection criteria and admission processes for parents.',
            content: getArticleContent(45, 'A Parent\'s Guide: Finding the Right School in Bangalore'),
            readTime: '14 min read',
            publishDate: '2024-01-17'
          }
        ]
      },
      {
        id: 'shopping-markets',
        name: 'Shopping & Markets',
        posts: [
          {
            id: 46,
            title: 'Shopping in Bangalore: Brigade Road to Commercial Street',
            excerpt: 'Navigate Bangalore\'s shopping landscape from malls to street markets.',
            content: getArticleContent(46, 'Shopping in Bangalore: Brigade Road to Commercial Street'),
            readTime: '11 min read',
            publishDate: '2024-01-15'
          },
          {
            id: 47,
            title: 'A Guide to KR Market: Bangalore\'s Busiest Wholesale Market',
            excerpt: 'Master the art of wholesale shopping at Krishna Rajendra Market.',
            content: getArticleContent(47, 'A Guide to KR Market: Bangalore\'s Busiest Wholesale Market'),
            readTime: '9 min read',
            publishDate: '2024-01-13'
          }
        ]
      },
      {
        id: 'civic-legal',
        name: 'Civic & Legal Essentials',
        posts: [
          {
            id: 48,
            title: 'Address Proof 101: How to Update Your Aadhaar in Bangalore',
            excerpt: 'Navigate bureaucratic procedures for address changes and documentation.',
            content: getArticleContent(48, 'Address Proof 101: How to Update Your Aadhaar in Bangalore'),
            readTime: '8 min read',
            publishDate: '2024-01-09'
          }
        ]
      }
    ]
  },
  {
    id: 'tourism',
    name: 'Tourism & Exploration',
    description: 'Discover weekend getaways and hidden gems around Bangalore',
    icon: 'MapPin',
    subcategories: [
      {
        id: 'weekend-getaways',
        name: 'Weekend Getaways',
        posts: [
          {
            id: 49,
            title: 'Weekend Getaways from Bangalore (Under 150 Kms)',
            excerpt: 'Escape the city chaos with these nearby destinations perfect for quick weekend trips.',
            content: getArticleContent(49, 'Weekend Getaways from Bangalore (Under 150 Kms)'),
            readTime: '13 min read',
            publishDate: '2024-02-20',
            featured: true
          },
          {
            id: 50,
            title: 'Long-Distance Weekend Getaways from Bangalore (300+ Kms)',
            excerpt: 'Extended weekend adventures to hill stations, beaches, and historical destinations.',
            content: getArticleContent(50, 'Long-Distance Weekend Getaways from Bangalore (300+ Kms)'),
            readTime: '15 min read',
            publishDate: '2024-02-18'
          }
        ]
      }
    ]
  }
];

export const featuredPosts = categories.flatMap(category => 
  category.subcategories.flatMap(subcategory => 
    subcategory.posts.filter(post => post.featured)
  )
);

export const allPosts = categories.flatMap(category => 
  category.subcategories.flatMap(subcategory => subcategory.posts)
);

export const searchPosts = (query) => {
  if (!query.trim()) return allPosts;
  
  const lowerQuery = query.toLowerCase();
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery)
  );
};

export const getPostsByCategory = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return category.subcategories.flatMap(subcategory => subcategory.posts);
};

export const getPostById = (id) => {
  return allPosts.find(post => post.id === parseInt(id));
};