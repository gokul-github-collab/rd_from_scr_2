import React, { useState } from 'react';

const FAQItem = ({  answers }) => {
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
              <h3 className="text-lg font-semibold mb-2">{answer.heading}</h3>
              <p className="text-gray-600">{answer.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Pos = () => {
  const faqData = [
    {
      question: 'What is Tailwind CSS?',
      answers: [
        {
          heading: 'PO-1',
          content: 'In the queryset attribute of your view, you\'re directly assigning the model class Course instead of a queryset that retrieves instances of the Course model.',
        },
        {
          heading: 'PO-2',
          content: 'To provide opportunities for acquiring in-depth knowledge in Industry 4.0/5.0 tools and techniques and thereby design and implement software projects to meet customer’s business objectives.',
        },
      ],
    },
    // Add more FAQ items as needed
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answers={faq.answers} />
      ))}
    </div>
  );
};

export default Pos;
