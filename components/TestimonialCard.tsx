
import React from 'react';
import type { Testimonial } from '../types';
import { StarIcon } from './icons/AppIcons';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-ternoae-green 
                   shadow-[4px_4px_0px_#0C4A1F] h-full flex flex-col">
      <div className="flex items-center mb-4">
        <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-ternoae-green" 
            loading="lazy"
        />
        <div>
          <h4 className="text-lg font-bold text-ternoae-green">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>
      <p className="text-text-main italic text-sm flex-grow">"{testimonial.quote}"</p>
    </div>
  );
};

export default TestimonialCard;