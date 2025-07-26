// Enhanced mock data with properly formatted articles
import formattedArticles from './formatted_articles.json';

// Featured images mapping for articles
const FEATURED_IMAGES = {
  1: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3NTM1MzczNDZ8MA&ixlib=rb-4.1.0&q=85",
  2: "https://images.pexels.com/photos/3288104/pexels-photo-3288104.png",
  3: "https://images.unsplash.com/photo-1612637968894-660373e23b03?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3NTM1MzczNDZ8MA&ixlib=rb-4.1.0&q=85",
  4: "https://images.unsplash.com/photo-1534655610770-dd69616f05ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3NTM1MzczNDZ8MA&ixlib=rb-4.1.0&q=85",
  5: "https://images.unsplash.com/photo-1506092309076-af15fb0051e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHN0cmVldHxlbnwwfHx8fDE3NTM1MzczOTV8MA&ixlib=rb-4.1.0&q=85",
  6: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1MzUzNzQxOHww&ixlib=rb-4.1.0&q=85",
  7: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1MzUzNzQxOHww&ixlib=rb-4.1.0&q=85",
  8: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3JrZXJzfGVufDB8fHx8MTc1MzUzNzM2MHww&ixlib=rb-4.1.0&q=85",
  9: "https://images.unsplash.com/photo-1649042964070-8eb14ea4da7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxtZXRybyUyMHRyYWlufGVufDB8fHx8MTc1MzUzNzM0MXww&ixlib=rb-4.1.0&q=85",
  10: "https://images.unsplash.com/photo-1589916179916-55151aecea0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdHJhZmZpY3xlbnwwfHx8fDE3NTM1MzczNjd8MA&ixlib=rb-4.1.0&q=85",
  11: "https://images.unsplash.com/photo-1597762333765-cbcd63dd8acc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxjaXR5JTIwdHJhZmZpY3xlbnwwfHx8fDE3NTM1MzczNjd8MA&ixlib=rb-4.1.0&q=85",
  12: "https://images.unsplash.com/photo-1473042904451-00171c69419d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxjaXR5JTIwdHJhZmZpY3xlbnwwfHx8fDE3NTM1MzczNjd8MA&ixlib=rb-4.1.0&q=85",
  13: "https://images.unsplash.com/photo-1649042966082-e98e95a79100?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtZXRybyUyMHRyYWlufGVufDB8fHx8MTc1MzUzNzM0MXww&ixlib=rb-4.1.0&q=85",
  14: "https://images.pexels.com/photos/33117699/pexels-photo-33117699.jpeg",
  15: "https://images.unsplash.com/photo-1413882353314-73389f63b6fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGxpbmVzfGVufDB8fHx8MTc1MzUzNzM4N3ww&ixlib=rb-4.1.0&q=85",
  16: "https://images.unsplash.com/photo-1610028290816-5d937a395a49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxwb3dlciUyMGxpbmVzfGVufDB8fHx8MTc1MzUzNzM4N3ww&ixlib=rb-4.1.0&q=85",
  17: "https://images.unsplash.com/photo-1558288459-c1e780664fd5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmt8ZW58MHx8fHwxNzUzNTM3NDEwfDA&ixlib=rb-4.1.0&q=85",
  18: "https://images.unsplash.com/photo-1558288459-c1e780664fd5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmt8ZW58MHx8fHwxNzUzNTM3NDEwfDA&ixlib=rb-4.1.0&q=85",
  19: "https://images.unsplash.com/photo-1610028290816-5d937a395a49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxwb3dlciUyMGxpbmVzfGVufDB8fHx8MTc1MzUzNzM4N3ww&ixlib=rb-4.1.0&q=85",
  20: "https://images.unsplash.com/photo-1697130383976-38f28c444292?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxiYW5nYWxvcmUlMjBjaXR5fGVufDB8fHx8MTc1MzUzNzMzNHww&ixlib=rb-4.1.0&q=85",
  21: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxvZmZpY2UlMjB3b3JrZXJzfGVufDB8fHx8MTc1MzUzNzM2MHww&ixlib=rb-4.1.0&q=85",
  22: "https://images.unsplash.com/photo-1687158267365-3584c7966bc4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxiYW5nYWxvcmUlMjBjaXR5fGVufDB8fHx8MTc1MzUzNzMzNHww&ixlib=rb-4.1.0&q=85",
  23: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kfGVufDB8fHx8MTc1MzUzNzM1M3ww&ixlib=rb-4.1.0&q=85",
  24: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmb29kfGVufDB8fHx8MTc1MzUzNzM1M3ww&ixlib=rb-4.1.0&q=85",
  25: "https://images.unsplash.com/photo-1593847794002-a67998d742fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbHxlbnwwfHx8fDE3NTM1MzczNzZ8MA&ixlib=rb-4.1.0&q=85",
  26: "https://images.unsplash.com/photo-1552581234-26160f608093?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxvZmZpY2UlMjB3b3JrZXJzfGVufDB8fHx8MTc1MzUzNzM2MHww&ixlib=rb-4.1.0&q=85",
  27: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDB8fHx8MTc1MzUzNzM4Mnww&ixlib=rb-4.1.0&q=85",
  28: "https://images.unsplash.com/photo-1615966192539-f1731963b19a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxoaWxsJTIwc3RhdGlvbnxlbnwwfHx8fDE3NTM1Mzc0MDJ8MA&ixlib=rb-4.1.0&q=85",
  29: "https://images.unsplash.com/photo-1634827181140-6ed3520f57c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxoaWxsJTIwc3RhdGlvbnxlbnwwfHx8fDE3NTM1Mzc0MDJ8MA&ixlib=rb-4.1.0&q=85",
  30: "https://images.unsplash.com/photo-1623692781109-898688d33165?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxoaWxsJTIwc3RhdGlvbnxlbnwwfHx8fDE3NTM1Mzc0MDJ8MA&ixlib=rb-4.1.0&q=85"
};

// Create a mapping of formatted articles by ID
const formattedArticleMap = {};
try {
  formattedArticles.forEach(article => {
    formattedArticleMap[article.id] = article;
  });
} catch (error) {
  console.log('Formatted articles not yet available, using placeholder content');
}

// Helper function to get article content with featured image
const getEnhancedArticleContent = (id, title, excerpt) => {
  const featuredImage = FEATURED_IMAGES[id];
  
  if (formattedArticleMap[id]) {
    // Clean markdown code blocks from content
    const cleanContent = formattedArticleMap[id].content
      .replace(/```html\n?/, '')
      .replace(/\n?```$/, '')
      .trim();
    
    return {
      content: cleanContent,
      readTime: formattedArticleMap[id].readTime,
      wordCount: formattedArticleMap[id].wordCount,
      featuredImage,
      featured: formattedArticleMap[id].featured
    };
  }
  
  // Generate properly formatted placeholder content
  const placeholderContent = `
    <h2>Introduction</h2>
    <p>Welcome to this comprehensive guide on ${title.toLowerCase()}.</p>
    <p>This article provides practical, actionable advice based on real experiences of living in Bangalore.</p>
    
    <div class="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
      <p class="text-lg text-gray-800 font-medium mb-2">🎯 Quick Overview</p>
      <p class="text-gray-700">${excerpt}</p>
    </div>
    
    <h2>Understanding the Bangalore Challenge</h2>
    <p>Bangalore presents unique challenges that require insider knowledge to navigate successfully.</p>
    <p>Whether you're a newcomer or a long-time resident, understanding the nuances matters.</p>
    
    <h3>The Reality Check</h3>
    <p>The Silicon Valley of India attracts thousands with promises of lucrative IT jobs.</p>
    <p>However, the reality often includes infrastructure challenges and high costs.</p>
    
    <h4>Common Challenges You'll Face</h4>
    <ul>
      <li>Traffic congestion and lengthy commutes</li>
      <li>Power cuts and water supply issues</li>
      <li>High rental deposits and complex agreements</li>
      <li>Language barriers and cultural adaptation</li>
    </ul>
    
    <h2>Practical Solutions That Work</h2>
    <p>Based on extensive research and real-world experience, here are proven strategies.</p>
    
    <h3>Research and Planning</h3>
    <p>Thorough research before making any major decisions can save you time and money.</p>
    <p>Connect with local communities and online forums to get current information.</p>
    
    <h4>Essential Preparation Steps</h4>
    <ol>
      <li>Join relevant WhatsApp groups and online communities</li>
      <li>Research neighborhoods and commute times thoroughly</li>
      <li>Prepare all necessary documents in advance</li>
      <li>Set realistic budget expectations</li>
    </ol>
    
    <h3>Building Local Networks</h3>
    <p>Networking with colleagues, neighbors, and local communities provides invaluable support.</p>
    <p>Attend meetups and participate in community events to build connections.</p>
    
    <h2>Cost Considerations and Budgeting</h2>
    <p>Understanding the true cost of living in Bangalore is crucial for financial planning.</p>
    <p>Factor in hidden costs like security deposits and utility connections.</p>
    
    <h3>Budget Breakdown</h3>
    <ul>
      <li>Accommodation: 40-50% of income</li>
      <li>Transportation: 10-15% of income</li>
      <li>Food and utilities: 20-25% of income</li>
      <li>Miscellaneous: 15-25% of income</li>
    </ul>
    
    <h2>Timeline and Process Management</h2>
    <p>Most processes in Bangalore take longer than expected due to bureaucracy.</p>
    <p>Plan for additional time and have backup options ready for critical needs.</p>
    
    <h3>Typical Timelines</h3>
    <ol>
      <li>Apartment hunting: 2-4 weeks</li>
      <li>Utility connections: 1-2 weeks</li>
      <li>Bank account opening: 3-7 days</li>
      <li>Vehicle registration: 2-3 weeks</li>
    </ol>
    
    <h2>Expert Tips for Success</h2>
    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
      <p class="text-gray-700 mb-2"><strong>Pro Tip:</strong> Balance ambition with pragmatism.</p>
      <p class="text-gray-700">Set realistic expectations while staying focused on long-term goals.</p>
    </div>
    
    <h3>Essential Documents to Keep Ready</h3>
    <ul>
      <li>Aadhaar card and PAN card</li>
      <li>Employment proof and salary slips</li>
      <li>Bank statements and photographs</li>
      <li>Previous address proof documents</li>
    </ul>
    
    <h2>Common Mistakes to Avoid</h2>
    <p>Learning from others' mistakes can save you significant hassle and expense.</p>
    
    <h3>Location-Related Mistakes</h3>
    <ul>
      <li>Underestimating commute times during peak hours</li>
      <li>Ignoring proximity to essential services</li>
      <li>Not considering monsoon flooding patterns</li>
    </ul>
    
    <h3>Financial Mistakes</h3>
    <ul>
      <li>Making advance payments without proper verification</li>
      <li>Not negotiating rental terms and deposits</li>
      <li>Overlooking hidden costs and charges</li>
    </ul>
    
    <h2>Safety and Security Considerations</h2>
    <p>While Bangalore is generally safe, taking precautions is important.</p>
    <p>Stay aware of your surroundings and follow basic safety protocols.</p>
    
    <h3>Safety Tips</h3>
    <ul>
      <li>Share your location with trusted contacts</li>
      <li>Use registered service providers</li>
      <li>Keep emergency numbers handy</li>
      <li>Trust your instincts in unfamiliar situations</li>
    </ul>
    
    <h2>Frequently Asked Questions</h2>
    
    <h3>How long does it take to settle in Bangalore?</h3>
    <p>Most people take 2-3 months to feel comfortable in the city.</p>
    <p>Full adaptation usually takes 6-12 months depending on individual circumstances.</p>
    
    <h3>What's the most challenging aspect of living in Bangalore?</h3>
    <p>Traffic and commute times are consistently rated as the biggest challenge.</p>
    <p>Infrastructure issues like power cuts and water supply also pose difficulties.</p>
    
    <h3>How can I minimize costs when moving to Bangalore?</h3>
    <p>Research thoroughly and negotiate rental terms effectively.</p>
    <p>Consider shared accommodations initially to reduce expenses.</p>
    
    <h2>Conclusion</h2>
    <p>Success in Bangalore requires preparation, realistic expectations, and local knowledge.</p>
    <p>Use this guide as your foundation and adapt strategies to your specific circumstances.</p>
    
    <div class="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
      <p class="text-gray-700 mb-2"><strong>Next Steps:</strong></p>
      <ul class="list-disc pl-4 space-y-1 text-gray-700">
        <li>Create a personalized checklist based on your needs</li>
        <li>Join relevant online communities for ongoing support</li>
        <li>Start building your local network early</li>
        <li>Keep all important documents organized and accessible</li>
      </ul>
    </div>
  `;
  
  return {
    content: placeholderContent,
    readTime: "15 min read",
    wordCount: 1500,
    featuredImage,
    featured: id <= 8
  };
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
            publishDate: '2024-01-15',
            ...getEnhancedArticleContent(1, 'The Ultimate Guide to Renting in Bangalore: Broker vs. Online Portals', 'Navigate the complex world of Bangalore rentals with insider tips on brokers, deposits, and negotiation tactics.')
          },
          {
            id: 2,
            title: 'Registering Your Rental Agreement in Bangalore: Is it Necessary?',
            excerpt: 'Understanding the legal requirements and practical implications of rental agreement registration.',
            publishDate: '2024-01-10',
            ...getEnhancedArticleContent(2, 'Registering Your Rental Agreement in Bangalore: Is it Necessary?', 'Understanding the legal requirements and practical implications of rental agreement registration.')
          },
          {
            id: 3,
            title: 'Understanding the PG (Paying Guest) Culture in Bangalore',
            excerpt: 'A comprehensive guide to PG accommodations - costs, benefits, and what to expect.',
            publishDate: '2024-01-05',
            ...getEnhancedArticleContent(3, 'Understanding the PG (Paying Guest) Culture in Bangalore', 'A comprehensive guide to PG accommodations - costs, benefits, and what to expect.')
          },
          {
            id: 4,
            title: 'Solo Living in Bangalore: A Guide for Bachelors and Bachelorettes',
            excerpt: 'Tips and strategies for independent living in the Silicon Valley of India.',
            publishDate: '2024-01-01',
            ...getEnhancedArticleContent(4, 'Solo Living in Bangalore: A Guide for Bachelors and Bachelorettes', 'Tips and strategies for independent living in the Silicon Valley of India.')
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
            publishDate: '2024-01-20',
            ...getEnhancedArticleContent(5, 'Choosing Your Bangalore Neighbourhood: A Techie\'s Guide to Living Near Tech Parks', 'Balance commute time, rental costs, and social infrastructure with our comprehensive neighborhood analysis.')
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
            id: 6,
            title: 'Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing',
            excerpt: 'Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies.',
            publishDate: '2024-02-01',
            ...getEnhancedArticleContent(6, 'Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing', 'Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies.')
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
            id: 7,
            title: 'Decoding Bangalore\'s Utilities: BESCOM, BWSSB, and GAIL',
            excerpt: 'Understand Bangalore\'s utility providers and how to manage your connections effectively.',
            publishDate: '2024-02-10',
            ...getEnhancedArticleContent(7, 'Decoding Bangalore\'s Utilities: BESCOM, BWSSB, and GAIL', 'Understand Bangalore\'s utility providers and how to manage your connections effectively.')
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
            id: 8,
            title: 'The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples',
            excerpt: 'Realistic budget breakdown confronting the cost-benefit miscalculation narrative.',
            publishDate: '2024-02-15',
            ...getEnhancedArticleContent(8, 'The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples', 'Realistic budget breakdown confronting the cost-benefit miscalculation narrative.')
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
            id: 9,
            title: 'Weekend Getaways from Bangalore (Under 150 Kms)',
            excerpt: 'Escape the city chaos with these nearby destinations perfect for quick weekend trips.',
            publishDate: '2024-02-20',
            ...getEnhancedArticleContent(9, 'Weekend Getaways from Bangalore (Under 150 Kms)', 'Escape the city chaos with these nearby destinations perfect for quick weekend trips.')
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