import React from 'react';
import '../styles/globals.css'

const QuestionsAndAnswers = () => {
  const questionsAndAnswers = [
    {
      question: 'How can I become a YooKatale partner?',
      answer:
        'To become a YooKatale partner, you can fill out our online partner form and provide the required information.',
    },
    {
      question: 'What are the vehicle requirements?',
      answer:
        'We accept motorcycles, bicycles, and vans as delivery vehicles. Please check our specific requirements for each vehicle type on our website.',
    },
  ];

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Questions & Answers</h2>
      <ul>
        {questionsAndAnswers.map((qa, index) => (
          <li key={index} className="mb-6">
            <h3 className="text-lg font-semibold">{qa.question}</h3>
            <p className="text-gray-600 mt-12">{qa.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsAndAnswers;
