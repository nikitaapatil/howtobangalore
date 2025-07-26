// Mock data for How to Bangalore website
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
            readTime: '12 min read',
            publishDate: '2024-01-15',
            featured: true
          },
          {
            id: 2,
            title: 'Registering Your Rental Agreement in Bangalore: Is it Necessary?',
            excerpt: 'Understanding the legal requirements and practical implications of rental agreement registration.',
            readTime: '8 min read',
            publishDate: '2024-01-10'
          },
          {
            id: 3,
            title: '"Rooms for Rent": Understanding the PG (Paying Guest) Culture in Bangalore',
            excerpt: 'A comprehensive guide to PG accommodations - costs, benefits, and what to expect.',
            readTime: '10 min read',
            publishDate: '2024-01-05'
          },
          {
            id: 4,
            title: 'Solo Living in Bangalore: A Guide for Bachelors and Bachelorettes',
            excerpt: 'Tips and strategies for independent living in the Silicon Valley of India.',
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
            readTime: '15 min read',
            publishDate: '2024-01-20',
            featured: true
          }
        ]
      },
      {
        id: 'home-setup',
        name: 'Setting Up Your Home',
        posts: [
          {
            id: 6,
            title: 'The Best Broadband for Your Home: A Showdown Between ACT, JioFiber, and Airtel',
            excerpt: 'Compare internet providers to find the best connectivity solution for your work-from-home setup.',
            readTime: '11 min read',
            publishDate: '2024-01-25'
          },
          {
            id: 7,
            title: 'A Guide to Domestic Help in Bangalore: Finding, Vetting, and Paying',
            excerpt: 'Navigate the domestic help ecosystem with practical advice on hiring and managing household staff.',
            readTime: '13 min read',
            publishDate: '2024-01-18'
          },
          {
            id: 8,
            title: 'Pet Care in Bangalore: A Guide for Pet Parents',
            excerpt: 'Everything pet parents need to know about veterinary care, pet-friendly apartments, and services.',
            readTime: '10 min read',
            publishDate: '2024-01-12'
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
            id: 9,
            title: 'Mastering the Bangalore Commute: A Guide to BMTC, Namma Metro, and Ride-Sharing',
            excerpt: 'Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies.',
            readTime: '14 min read',
            publishDate: '2024-02-01',
            featured: true
          },
          {
            id: 10,
            title: 'Monsoon Preparedness: How to Survive Bangalore\'s Rains',
            excerpt: 'Traffic tips and strategies for navigating the city during monsoon season.',
            readTime: '9 min read',
            publishDate: '2024-01-30'
          },
          {
            id: 11,
            title: 'The Bangalore Traffic Police: Understanding Fines and E-Challans',
            excerpt: 'Stay compliant with traffic rules and understand the e-challan system.',
            readTime: '7 min read',
            publishDate: '2024-01-28'
          }
        ]
      },
      {
        id: 'personal-vehicles',
        name: 'Personal Vehicles',
        posts: [
          {
            id: 12,
            title: 'Your First Vehicle in Bangalore: Buying a Used Car vs. a New Two-Wheeler',
            excerpt: 'Make an informed decision about your first vehicle purchase in Bangalore.',
            readTime: '12 min read',
            publishDate: '2024-02-05'
          },
          {
            id: 13,
            title: 'How to Get Your Karnataka Driving License',
            excerpt: 'Step-by-step guide to obtaining your driving license in Karnataka.',
            readTime: '10 min read',
            publishDate: '2024-02-03'
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
            id: 14,
            title: 'Decoding Bangalore\'s Utilities: A Newcomer\'s Guide to BESCOM, BWSSB, and GAIL',
            excerpt: 'Understand Bangalore\'s utility providers and how to manage your connections effectively.',
            readTime: '13 min read',
            publishDate: '2024-02-10',
            featured: true
          },
          {
            id: 15,
            title: 'Dealing with Power Cuts: An Essential Bangalore Survival Guide',
            excerpt: 'Prepare for power outages with inverters, UPS systems, and backup solutions.',
            readTime: '11 min read',
            publishDate: '2024-02-08'
          },
          {
            id: 16,
            title: 'Understanding Bangalore\'s Water Tanker System',
            excerpt: 'Navigate water scarcity with tanker services and water management strategies.',
            readTime: '9 min read',
            publishDate: '2024-02-06'
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
            id: 17,
            title: 'The Cost of Living in Bangalore: A Detailed Monthly Budget for a Couple in IT',
            excerpt: 'Realistic budget breakdown confronting the cost-benefit miscalculation narrative.',
            readTime: '16 min read',
            publishDate: '2024-02-15',
            featured: true
          },
          {
            id: 18,
            title: 'Advanced Tax Planning for Salaried IT Professionals in Karnataka',
            excerpt: 'Optimize your tax strategy with state-specific considerations and investment options.',
            readTime: '14 min read',
            publishDate: '2024-02-12'
          }
        ]
      },
      {
        id: 'culture-social',
        name: 'Culture & Social Life',
        posts: [
          {
            id: 19,
            title: 'The South Indian Breakfast Trail: 10 Legendary Eateries You Must Visit',
            excerpt: 'Discover authentic South Indian breakfast spots beyond the typical hotel chains.',
            readTime: '12 min read',
            publishDate: '2024-02-18'
          },
          {
            id: 20,
            title: 'Bangalore\'s Microbrewery Culture: The Top 10 Spots for Craft Beer Lovers',
            excerpt: 'Explore the city\'s thriving craft beer scene with our curated brewery guide.',
            readTime: '11 min read',
            publishDate: '2024-02-16'
          },
          {
            id: 21,
            title: '"Swalpa Adjust Maadi": 15 Essential Kannada Phrases for Daily Life',
            excerpt: 'Bridge the language gap with essential Kannada phrases for better local interactions.',
            readTime: '8 min read',
            publishDate: '2024-02-14'
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
            id: 22,
            title: 'Weekend Getaways from Bangalore (Under 150 Kms)',
            excerpt: 'Escape the city chaos with these nearby destinations perfect for quick weekend trips.',
            readTime: '13 min read',
            publishDate: '2024-02-20',
            featured: true
          },
          {
            id: 23,
            title: 'Long-Distance Weekend Getaways from Bangalore (300+ Kms)',
            excerpt: 'Extended weekend adventures to hill stations, beaches, and historical destinations.',
            readTime: '15 min read',
            publishDate: '2024-02-18'
          }
        ]
      },
      {
        id: 'city-exploration',
        name: 'City Parks & Nature',
        posts: [
          {
            id: 24,
            title: 'The Ultimate Guide to Bangalore\'s Parks: Beyond Lalbagh and Cubbon Park',
            excerpt: 'Discover hidden green spaces and urban oases for mental well-being and recreation.',
            readTime: '10 min read',
            publishDate: '2024-02-22'
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