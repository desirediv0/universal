"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/Api";
import { Loader2Icon } from "lucide-react";
import Wrapper from "./Wrapper";

export default function Product({ activepage = "product" }) {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const FeaturedProduct = activepage == "homepage" ? Data.slice(0, 3) : Data;
  useEffect(() => {
    const Products = async () => {
      const data = await fetchProducts();
      setData(data);
      setLoading(false);
    };
    Products();
  }, []);

  return (
    <>
      <Wrapper>
        <span className="w-full pb-12 flex flex-col justify-center items-center ">
          <h1 className="text-4xl md:text-5xl ">
            {activepage === "homepage" ? "Our Products" : "All Products"}{" "}
          </h1>
          {activepage === "homepage" && (
            <div className="bg-[#f0b827] w-32 h-1 rounded-full mt-2 "></div>
          )}
        </span>
        {Loading && (
          <div className="flex justify-center items-center w-full h-screen">
            <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg font-medium">Loading...</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-4">
          {FeaturedProduct.map((items, index) => (
            <Link
              className="group relative block transform transition-all duration-300 ease-in-out hover:-translate-y-2"
              key={index}
              href="/product/slug"
            >
              <div className="flex flex-col h-full">
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={items.title}
                      width={600}
                      height={500}
                      src={items.image}
                    />
                    {/* Enhanced Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 items-center">
                      {items.title}
                    </h2>
                      <button className="bg-gray-100 hover:bg-[#f0b827] hover:text-white transition-colors duration-300 px-6 py-2.5 rounded-lg text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {activepage === "homepage" && (
          <div className="w-full text-center pt-8">
            <Link href="/product">
              <button className="bg-[#f0b827] text-white border-0 mt-3 py-3 px-8 rounded-lg  ">
                View All Products
              </button>
            </Link>
          </div>
        )}
      </Wrapper>
    </>
  );
}
