import React from 'react';
import Wrapper from './Wrapper';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "We've been using equipment from Universal for over two years, and the quality is unmatched. Their road rollers and asphalt pavers are built to last, and their performance on site has been outstanding.",
      client: "Rahul Kumar",

    },
    {
      quote: "We've been using equipment from Universal for over two years, and the quality is unmatched. Their road rollers and asphalt pavers are built to last, and their performance on site has been outstanding.",
      client: "Nilesh Kapoor",

    },
    {
      quote: "We've been using equipment from Universal for over two years, and the quality is unmatched. Their road rollers and asphalt pavers are built to last, and their performance on site has been outstanding.",
      client: "Hitesh Solanki",

    }
  ];

  return (
    <Wrapper>
      <div className=" flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl tracking-tight leading-tight">
          What Client Says ?
        </h2>
        <div className='bg-[#f0b827] w-32 h-1 rounded-full mt-2 '></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {testimonials.map((items, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-8"
          >
            <p className="text-gray-700 mb-4">{items.quote}</p>
            <p className="text-gray-700 font-medium">
              - {items.client}
            </p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Testimonials;