import React from 'react'
import { BsPatchCheck } from "react-icons/bs";
import { PiLightbulbFilament } from "react-icons/pi";
import { IoShieldCheckmarkOutline } from "react-icons/io5"
import { RiCustomerService2Line } from "react-icons/ri";
import Wrapper from './Wrapper';
import Image from 'next/image';

export default function Whychoose() {
    const features = [
      {
        title: "Quality",
        description:
          "We provide high-standard machinery that exceeds industry requirements, ensuring durability, efficiency, and top-tier performance in road construction and soil stabilization projects",
        icon: BsPatchCheck,
      },
      {
        title: "Innovation",
        description:
          "Our products integrate cutting-edge technology to enhance productivity, precision, and cost-effectiveness, making road construction faster, smarter, and more reliable.",
        icon: PiLightbulbFilament,
      },
      {
        title: "Reliability",
        description:
          "Designed for longevity and tough conditions, our machines ensure consistent performance, minimal downtime, and maximum efficiency, even in challenging terrains.",
        icon: IoShieldCheckmarkOutline,
      },
      {
        title: "Customer Support",
        description:
          "We offer dedicated technical assistance, expert servicing, and customized solutions, ensuring seamless operation and long-term reliability for all our clients.",
        icon: RiCustomerService2Line,
      },
    ];

    return (
      <Wrapper>
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="mb-12 md:mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl tracking-tight leading-tight">
              Why Choose Us
            </h2>
            <div className="bg-[#f0b827] w-32 h-1 rounded-full mt-2 "></div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8  pb-16">
            {/* Features Grid */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 cursor-pointer sm:grid-cols-2 gap-6 ">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 
                                    transform transition duration-300 
                                    hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex items-center mb-4 ">
                    <div className="mr-4 text-[#f0b827] p-1 rounded-full">
                      <feature.icon color="" size={35} />
                    </div>
                    <h3 className="text-[1.2rem] font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-[1rem] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Image Container */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
              <div className="w-full flex justify-center ">
                <Image
                  src="/rr.png"
                  alt="why choose us illustration"
                  width={500}
                  height={500}
                  priority
                  className="rounded-lg h-[550px] object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
}