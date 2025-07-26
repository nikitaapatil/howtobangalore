// Enhanced mock data with featured images and comprehensive SEO articles
import seoArticles from './seo_articles.json';

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

// Create a mapping of SEO articles by ID
const seoArticleMap = {};
try {
  seoArticles.forEach(article => {
    seoArticleMap[article.id] = article;
  });
} catch (error) {
  console.log('SEO articles not yet available, using placeholder content');
}

// Helper function to get article content with featured image
const getEnhancedArticleContent = (id, title, excerpt) => {
  const featuredImage = FEATURED_IMAGES[id];
  
  if (seoArticleMap[id]) {
    return {
      content: seoArticleMap[id].content,
      readTime: seoArticleMap[id].readTime,
      wordCount: seoArticleMap[id].wordCount,
      featuredImage,
      featured: seoArticleMap[id].featured
    };
  }
  
  // Generate comprehensive placeholder content for articles not yet generated
  const placeholderContent = `
    <h1>${title}</h1>
    
    <div class="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
      <p class="text-lg text-gray-800 font-medium mb-2">🎯 Quick Overview</p>
      <p class="text-gray-700">${excerpt}</p>
    </div>
    
    <h2>Why This Matters in Bangalore</h2>
    <p class="mb-4">Bangalore presents unique challenges that require insider knowledge to navigate successfully.</p>
    <p class="mb-6">Whether you're a newcomer or a long-time resident, understanding the nuances of city life can make a significant difference in your daily experience.</p>
    
    <h2>The Bangalore Reality Check</h2>
    <p class="mb-4">The Silicon Valley of India attracts thousands with promises of lucrative IT jobs and cosmopolitan living.</p>
    <p class="mb-6">However, the reality often includes infrastructure challenges, high costs, and complex bureaucracy.</p>
    
    <h3>Common Challenges You'll Face</h3>
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li>Traffic congestion and lengthy commutes</li>
      <li>Power cuts and water supply issues</li>
      <li>High rental deposits and complex agreements</li>
      <li>Language barriers and cultural adaptation</li>
      <li>Bureaucratic processes for basic services</li>
    </ul>
    
    <h2>Practical Solutions That Work</h2>
    <p class="mb-4">Based on extensive research and real-world experience, here are proven strategies:</p>
    
    <h3>Research and Planning</h3>
    <p class="mb-4">Thorough research before making any major decisions can save you significant time and money.</p>
    <p class="mb-6">Connect with local communities and online forums to get current information and advice.</p>
    
    <h3>Build Local Networks</h3>
    <p class="mb-4">Networking with colleagues, neighbors, and local communities provides invaluable support.</p>
    <p class="mb-6">Join WhatsApp groups, attend meetups, and participate in community events to build connections.</p>
    
    <h3>Technology Solutions</h3>
    <p class="mb-4">Leverage apps and online platforms to simplify daily tasks and navigate city services.</p>
    <p class="mb-6">From ride-hailing to utility bill payments, technology can significantly ease your Bangalore experience.</p>
    
    <h2>Cost Considerations</h2>
    <p class="mb-4">Understanding the true cost of living in Bangalore is crucial for financial planning.</p>
    <p class="mb-6">Factor in hidden costs like security deposits, utility connections, and transportation.</p>
    
    <h3>Budget Breakdown</h3>
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li>Accommodation: 40-50% of income</li>
      <li>Transportation: 10-15% of income</li>
      <li>Food and utilities: 20-25% of income</li>
      <li>Miscellaneous: 15-25% of income</li>
    </ul>
    
    <h2>Timeline and Process</h2>
    <p class="mb-4">Most processes in Bangalore take longer than expected due to bureaucracy and high demand.</p>
    <p class="mb-6">Plan for additional time and have backup options ready for critical needs.</p>
    
    <h3>Typical Timelines</h3>
    <ol class="list-decimal pl-6 mb-6 space-y-2">
      <li>Apartment hunting: 2-4 weeks</li>
      <li>Utility connections: 1-2 weeks</li>
      <li>Bank account opening: 3-7 days</li>
      <li>Vehicle registration: 2-3 weeks</li>
    </ol>
    
    <h2>Expert Tips for Success</h2>
    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
      <p class="text-gray-700 mb-2"><strong>Pro Tip:</strong> The key to succeeding in Bangalore is balancing ambition with pragmatism.</p>
      <p class="text-gray-700">Set realistic expectations while staying focused on your long-term goals.</p>
    </div>
    
    <h3>Essential Documents to Keep Ready</h3>
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li>Aadhaar card and PAN card</li>
      <li>Employment proof and salary slips</li>
      <li>Bank statements and photographs</li>
      <li>Previous address proof documents</li>
    </ul>
    
    <h2>Common Mistakes to Avoid</h2>
    <p class="mb-4">Learning from others' mistakes can save you significant hassle and expense:</p>
    
    <h3>Location-Related Mistakes</h3>
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li>Underestimating commute times during peak hours</li>
      <li>Ignoring proximity to essential services</li>
      <li>Not considering monsoon flooding patterns</li>
    </ul>
    
    <h3>Financial Mistakes</h3>
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li>Making advance payments without proper verification</li>
      <li>Not negotiating rental terms and deposits</li>
      <li>Overlooking hidden costs and charges</li>
    </ul>
    
    <h2>Safety and Security</h2>
    <p class="mb-4">While Bangalore is generally safe, taking precautions is important, especially for newcomers.</p>
    <p class="mb-6">Stay aware of your surroundings and follow basic safety protocols.</p>
    
    <h3>Safety Tips</h3>
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li>Share your location with trusted contacts</li>
      <li>Use registered service providers</li>
      <li>Keep emergency numbers handy</li>
      <li>Trust your instincts in unfamiliar situations</li>
    </ul>
    
    <h2>Frequently Asked Questions</h2>
    
    <h3>How long does it typically take to settle in Bangalore?</h3>
    <p class="mb-4">Most people take 2-3 months to feel comfortable and 6-12 months to fully adapt to Bangalore life.</p>
    
    <h3>What's the most challenging aspect of living in Bangalore?</h3>
    <p class="mb-4">Traffic and commute times are consistently rated as the biggest challenge by residents.</p>
    
    <h3>How can I minimize costs when moving to Bangalore?</h3>
    <p class="mb-6">Research thoroughly, negotiate rental terms, and consider shared accommodations initially.</p>
    
    <h2>Your Next Steps</h2>
    <p class="mb-4">Now that you have this foundational knowledge, you can move forward with confidence.</p>
    <p class="mb-4">Remember that every situation is unique, so adapt these guidelines to your specific circumstances.</p>
    
    <div class="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
      <p class="text-gray-700 mb-2"><strong>Action Items:</strong></p>
      <ul class="list-disc pl-4 space-y-1 text-gray-700">
        <li>Create a checklist based on your specific needs</li>
        <li>Join relevant online communities and groups</li>
        <li>Start building your local network early</li>
        <li>Keep all important documents organized</li>
      </ul>
    </div>
    
    <p class="mb-4">This comprehensive approach will help you navigate the complexities of Bangalore life more effectively.</p>
    <p>For more detailed guides on specific topics, explore our other articles in this category.</p>
  `;
  
  return {
    content: placeholderContent,
    readTime: "12 min read",
    wordCount: 1200,
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
          },
          {
            id: 6,
            title: 'Koramangala vs HSR Layout vs Indiranagar: The Ultimate Neighborhood Comparison',
            excerpt: 'Detailed analysis of Bangalore\'s most popular residential areas for young professionals.',
            publishDate: '2024-01-18',
            ...getEnhancedArticleContent(6, 'Koramangala vs HSR Layout vs Indiranagar: The Ultimate Neighborhood Comparison', 'Detailed analysis of Bangalore\'s most popular residential areas for young professionals.')
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
            publishDate: '2024-01-25',
            ...getEnhancedArticleContent(7, 'The Best Broadband for Your Home: ACT vs JioFiber vs Airtel', 'Compare internet providers to find the best connectivity solution for your work-from-home setup.')
          },
          {
            id: 8,
            title: 'A Guide to Domestic Help in Bangalore: Finding, Vetting, and Paying',
            excerpt: 'Navigate the domestic help ecosystem with practical advice on hiring and managing household staff.',
            publishDate: '2024-01-18',
            ...getEnhancedArticleContent(8, 'A Guide to Domestic Help in Bangalore: Finding, Vetting, and Paying', 'Navigate the domestic help ecosystem with practical advice on hiring and managing household staff.')
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
            title: 'Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing',
            excerpt: 'Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies.',
            publishDate: '2024-02-01',
            ...getEnhancedArticleContent(9, 'Mastering the Bangalore Commute: BMTC, Namma Metro, and Ride-Sharing', 'Your comprehensive guide to public transport, ride-hailing, and commute optimization strategies.')
          },
          {
            id: 10,
            title: 'Monsoon Preparedness: How to Survive Bangalore\'s Rains and Traffic',
            excerpt: 'Traffic tips and strategies for navigating the city during monsoon season.',
            publishDate: '2024-01-30',
            ...getEnhancedArticleContent(10, 'Monsoon Preparedness: How to Survive Bangalore\'s Rains and Traffic', 'Traffic tips and strategies for navigating the city during monsoon season.')
          },
          {
            id: 11,
            title: 'The Bangalore Traffic Police: Understanding Fines and E-Challans',
            excerpt: 'Stay compliant with traffic rules and understand the e-challan system.',
            publishDate: '2024-01-28',
            ...getEnhancedArticleContent(11, 'The Bangalore Traffic Police: Understanding Fines and E-Challans', 'Stay compliant with traffic rules and understand the e-challan system.')
          }
        ]
      },
      {
        id: 'personal-vehicles',
        name: 'Personal Vehicles',
        posts: [
          {
            id: 12,
            title: 'Your First Vehicle in Bangalore: Used Car vs New Two-Wheeler',
            excerpt: 'Make an informed decision about your first vehicle purchase in Bangalore.',
            publishDate: '2024-02-05',
            ...getEnhancedArticleContent(12, 'Your First Vehicle in Bangalore: Used Car vs New Two-Wheeler', 'Make an informed decision about your first vehicle purchase in Bangalore.')
          },
          {
            id: 13,
            title: 'How to Get Your Karnataka Driving License',
            excerpt: 'Step-by-step guide to obtaining your driving license in Karnataka.',
            publishDate: '2024-02-03',
            ...getEnhancedArticleContent(13, 'How to Get Your Karnataka Driving License', 'Step-by-step guide to obtaining your driving license in Karnataka.')
          },
          {
            id: 14,
            title: 'Navigating Bangalore\'s RTOs: A Complete Guide',
            excerpt: 'Master the Regional Transport Office procedures and documentation.',
            publishDate: '2024-01-31',
            ...getEnhancedArticleContent(14, 'Navigating Bangalore\'s RTOs: A Complete Guide', 'Master the Regional Transport Office procedures and documentation.')
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
            id: 15,
            title: 'Decoding Bangalore\'s Utilities: BESCOM, BWSSB, and GAIL',
            excerpt: 'Understand Bangalore\'s utility providers and how to manage your connections effectively.',
            publishDate: '2024-02-10',
            ...getEnhancedArticleContent(15, 'Decoding Bangalore\'s Utilities: BESCOM, BWSSB, and GAIL', 'Understand Bangalore\'s utility providers and how to manage your connections effectively.')
          },
          {
            id: 16,
            title: 'Dealing with Power Cuts: An Essential Bangalore Survival Guide',
            excerpt: 'Prepare for power outages with inverters, UPS systems, and backup solutions.',
            publishDate: '2024-02-08',
            ...getEnhancedArticleContent(16, 'Dealing with Power Cuts: An Essential Bangalore Survival Guide', 'Prepare for power outages with inverters, UPS systems, and backup solutions.')
          },
          {
            id: 17,
            title: 'Understanding Bangalore\'s Water Tanker System',
            excerpt: 'Navigate water scarcity with tanker services and water management strategies.',
            publishDate: '2024-02-06',
            ...getEnhancedArticleContent(17, 'Understanding Bangalore\'s Water Tanker System', 'Navigate water scarcity with tanker services and water management strategies.')
          },
          {
            id: 18,
            title: 'The Bangalore Hair Fall Epidemic: Hard Water Solutions',
            excerpt: 'Combat hard water effects with practical solutions and water treatment options.',
            publishDate: '2024-02-04',
            ...getEnhancedArticleContent(18, 'The Bangalore Hair Fall Epidemic: Hard Water Solutions', 'Combat hard water effects with practical solutions and water treatment options.')
          }
        ]
      },
      {
        id: 'waste-management',
        name: 'Waste Management',
        posts: [
          {
            id: 19,
            title: 'Waste Management 101: Understanding BBMP\'s Segregation Rules',
            excerpt: 'Master Bangalore\'s waste segregation system and disposal guidelines.',
            publishDate: '2024-01-21',
            ...getEnhancedArticleContent(19, 'Waste Management 101: Understanding BBMP\'s Segregation Rules', 'Master Bangalore\'s waste segregation system and disposal guidelines.')
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
            id: 20,
            title: 'The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples',
            excerpt: 'Realistic budget breakdown confronting the cost-benefit miscalculation narrative.',
            publishDate: '2024-02-15',
            ...getEnhancedArticleContent(20, 'The Cost of Living in Bangalore: A Detailed Monthly Budget for IT Couples', 'Realistic budget breakdown confronting the cost-benefit miscalculation narrative.')
          },
          {
            id: 21,
            title: 'Advanced Tax Planning for IT Professionals in Karnataka',
            excerpt: 'Optimize your tax strategy with state-specific considerations and investment options.',
            publishDate: '2024-02-12',
            ...getEnhancedArticleContent(21, 'Advanced Tax Planning for IT Professionals in Karnataka', 'Optimize your tax strategy with state-specific considerations and investment options.')
          },
          {
            id: 22,
            title: 'Why People Leave Bangalore: An Honest Look at the Challenges',
            excerpt: 'Understanding the factors that drive people away from India\'s Silicon Valley.',
            publishDate: '2024-02-09',
            ...getEnhancedArticleContent(22, 'Why People Leave Bangalore: An Honest Look at the Challenges', 'Understanding the factors that drive people away from India\'s Silicon Valley.')
          }
        ]
      },
      {
        id: 'culture-social',
        name: 'Culture & Social Life',
        posts: [
          {
            id: 23,
            title: 'The South Indian Breakfast Trail: 10 Legendary Eateries',
            excerpt: 'Discover authentic South Indian breakfast spots beyond the typical hotel chains.',
            publishDate: '2024-02-18',
            ...getEnhancedArticleContent(23, 'The South Indian Breakfast Trail: 10 Legendary Eateries', 'Discover authentic South Indian breakfast spots beyond the typical hotel chains.')
          },
          {
            id: 24,
            title: 'Bangalore\'s Microbrewery Culture: Top 10 Craft Beer Spots',
            excerpt: 'Explore the city\'s thriving craft beer scene with our curated brewery guide.',
            publishDate: '2024-02-16',
            ...getEnhancedArticleContent(24, 'Bangalore\'s Microbrewery Culture: Top 10 Craft Beer Spots', 'Explore the city\'s thriving craft beer scene with our curated brewery guide.')
          },
          {
            id: 25,
            title: 'Swalpa Adjust Maadi: 15 Essential Kannada Phrases for Daily Life',
            excerpt: 'Bridge the language gap with essential Kannada phrases for better local interactions.',
            publishDate: '2024-02-14',
            ...getEnhancedArticleContent(25, 'Swalpa Adjust Maadi: 15 Essential Kannada Phrases for Daily Life', 'Bridge the language gap with essential Kannada phrases for better local interactions.')
          }
        ]
      },
      {
        id: 'work-career',
        name: 'Work & Career',
        posts: [
          {
            id: 26,
            title: 'From Fresher to Team Lead: Navigating IT Job Market in Bangalore',
            excerpt: 'Career progression strategies for IT professionals in Bangalore.',
            publishDate: '2024-02-13',
            ...getEnhancedArticleContent(26, 'From Fresher to Team Lead: Navigating IT Job Market in Bangalore', 'Career progression strategies for IT professionals in Bangalore.')
          }
        ]
      },
      {
        id: 'health-wellness',
        name: 'Health & Wellness',
        posts: [
          {
            id: 27,
            title: 'Healthcare in Bangalore: Multi-Speciality Hospitals vs Local Clinics',
            excerpt: 'Navigate Bangalore\'s healthcare system with informed choices.',
            publishDate: '2024-02-05',
            ...getEnhancedArticleContent(27, 'Healthcare in Bangalore: Multi-Speciality Hospitals vs Local Clinics', 'Navigate Bangalore\'s healthcare system with informed choices.')
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
            id: 28,
            title: 'Weekend Getaways from Bangalore (Under 150 Kms)',
            excerpt: 'Escape the city chaos with these nearby destinations perfect for quick weekend trips.',
            publishDate: '2024-02-20',
            ...getEnhancedArticleContent(28, 'Weekend Getaways from Bangalore (Under 150 Kms)', 'Escape the city chaos with these nearby destinations perfect for quick weekend trips.')
          },
          {
            id: 29,
            title: 'Long-Distance Weekend Getaways from Bangalore (300+ Kms)',
            excerpt: 'Extended weekend adventures to hill stations, beaches, and historical destinations.',
            publishDate: '2024-02-18',
            ...getEnhancedArticleContent(29, 'Long-Distance Weekend Getaways from Bangalore (300+ Kms)', 'Extended weekend adventures to hill stations, beaches, and historical destinations.')
          }
        ]
      },
      {
        id: 'city-exploration',
        name: 'City Parks & Nature',
        posts: [
          {
            id: 30,
            title: 'The Ultimate Guide to Bangalore\'s Parks: Beyond Lalbagh and Cubbon Park',
            excerpt: 'Discover hidden green spaces and urban oases for mental well-being and recreation.',
            publishDate: '2024-02-22',
            ...getEnhancedArticleContent(30, 'The Ultimate Guide to Bangalore\'s Parks: Beyond Lalbagh and Cubbon Park', 'Discover hidden green spaces and urban oases for mental well-being and recreation.')
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