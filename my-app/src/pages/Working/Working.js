import React from 'react';
import { motion } from 'framer-motion';

const HOW_IT_WORKS_CONTENT = [
  {
    title: 'Open the Test',
    description: 'Click on the "Start Assessment" button to begin the MindCheck test.',
  },
  {
    title: 'Answer Questions',
    description: 'Carefully respond to 25 questions across four sections. Choose a score ranging from 1 to 5 for each question.',
  },
  {
    title: 'Calculate Your Score',
    description: "Once you've completed the questions, your scores will be calculated automatically.",
  },
  {
    title: 'Get Feedback',
    description: 'Discover your total score and refer to the provided feedback. Understand your level of depression based on the score range and gain valuable insights into your emotional well-being.',
  },
  {
    title: 'Take Action',
    description: 'Use the feedback to determine if further steps are necessary. Seek professional help if required or explore self-help techniques outlined in the app to improve your mental health.',
  },
];

function Working() {
  return (
    <div className="working">
      <h2>How it works?</h2>
      <div className="working-content">
        {HOW_IT_WORKS_CONTENT.map((content, index) => (
          <div key={index} className="working-item">
            <h3>{content.title}</h3>
            <p>{content.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Working;