import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [isVisible, setIsVisible] = useState(true);

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
        const actualHeading = document.querySelector(`h${heading.level}`);
        if (actualHeading && actualHeading.textContent === heading.text) {
          actualHeading.id = heading.id;
        }
      });
    }, 100);
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
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 transition-transform duration-300 ${!isVisible ? '-translate-x-full' : ''}`}>
      <Card className="w-64 max-h-96 overflow-y-auto shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-900 flex items-center">
              <List className="h-4 w-4 mr-2" />
              Table of Contents
            </CardTitle>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-gray-400 hover:text-gray-600 lg:hidden"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isVisible ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                  activeHeading === heading.id
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } ${
                  heading.level === 2 ? 'pl-2' : 
                  heading.level === 3 ? 'pl-6' : 
                  'pl-10'
                }`}
              >
                <div className="truncate" title={heading.text}>
                  {heading.text}
                </div>
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>
      
      {/* Toggle button for mobile */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-r-lg p-2 shadow-md hover:bg-gray-50 lg:hidden"
        >
          <List className="h-4 w-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default TableOfContents;