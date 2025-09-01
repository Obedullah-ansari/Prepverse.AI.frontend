import React from 'react';
import { Star, } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  rating: number;
  testimonial: string;
}

const ReviewCard: React.FC<TestimonialCardProps> = ({ name, avatar, rating, testimonial }) => {
  return (
    <div 
    className={`bg-neutral-100 md:w-[20] sm:w-full max-sm:w-full lg:h-[13.5rem] lg:w-[20rem] rounded-2xl !p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100`}>
      <div className="flex items-center !mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover !mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="!ml-2 text-sm font-medium text-gray-600">{rating}.0</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 font-semibold text-[0.9rem] italic ">{testimonial}</p>
      
     
    </div>
  );
};

export default ReviewCard;
