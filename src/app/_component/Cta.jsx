import React from "react";
import { ArrowRight, Cog } from "lucide-react";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="bg-[var(--lightcolor)] py-16 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-12">
        <div className="flex-1 text-white py-5 px-8">
          <div className="flex items-center mb-4">
            <h2 className="text-4xl text-black font-extrabold tracking-tight">
              Engineered for Excellence, Built for Roads.
            </h2>
          </div>
          <p className="text-lg text-black max-w-xl leading-relaxed">
            Your one-stop destination for high-quality road construction
            machinery. We offer durable, efficient, and innovative equipment to
            power your projects and ensure seamless construction, paving the way
            for a better tomorrow.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link href="/contact">
            <button
              className="bg-[#f0b827] text-white font-bold py-4 px-8 rounded-lg 
            transition duration-300 ease-in-out transform hover:-translate-y-1 
            shadow-2xl flex items-center justify-center space-x-3 
            group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition" />
            </button>
          </Link>

          <div className="text-center text-sm text-gray-400">
            ISO Certified 2024
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
