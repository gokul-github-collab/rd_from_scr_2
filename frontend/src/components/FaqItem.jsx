import React, { useState } from 'react';

const FAQItem = ({ answers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded p-4 mb-2">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <svg
          className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {isOpen && (
        <div className="mt-2">
          {answers.map((answer, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{answer.title}</h3>
              <p className="text-gray-600">{answer.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default FAQItem