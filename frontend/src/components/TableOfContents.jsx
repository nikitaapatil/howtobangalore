import React, { useState, useEffect } from 'react';
import { List } from 'lucide-react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    // Extract headings from content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3, h4');
    
    const extractedHeadings = Array.from(headingElements).map((heading, index) => {
      const id = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      return {
        id: id + '-' + index,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
        element: heading
      };
    });

    setHeadings(extractedHeadings);

    // Add IDs to actual headings in the DOM
    setTimeout(() => {
      extractedHeadings.forEach((heading) => {
        const actualHeadings = document.querySelectorAll(`h${heading.level}`);
        actualHeadings.forEach(actualHeading => {
          if (actualHeading.textContent === heading.text) {
            actualHeading.id = heading.id;
          }
        });
      });
    }, 500);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveHeading(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (headingId) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 w-72">
      <div className="bg-gray-50 border-l-4 border-orange-500 pl-6 pr-4 py-6 rounded-r-lg">
        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900 flex items-center">
            <List className="h-5 w-5 mr-2 text-orange-600" />
            Table of Contents
          </h3>
        </div>
        <div className="pt-4 max-h-[70vh] overflow-y-auto">
          <nav className="space-y-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  activeHeading === heading.id
                    ? 'bg-orange-100 text-orange-800 font-semibold border-l-3 border-orange-500 shadow-sm'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900 border-l-3 border-transparent hover:shadow-sm'
                } ${
                  heading.level === 2 ? 'pl-3 font-medium' : 
                  heading.level === 3 ? 'pl-6 font-normal' : 
                  'pl-9 font-normal text-xs'
                }`}
              >
                <div className="truncate leading-relaxed" title={heading.text}>
                  {heading.level === 2 && <span className="text-orange-500 mr-2">▶</span>}
                  {heading.level === 3 && <span className="text-gray-400 mr-2">◦</span>}
                  {heading.level > 3 && <span className="text-gray-300 mr-2">-</span>}
                  {heading.text}
                </div>
              </button>
            ))}
          </nav>
          
          {/* Progress indicator */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Reading Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (headings.findIndex(h => h.id === activeHeading) + 1) / headings.length * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;