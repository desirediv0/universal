"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCategoryProducts } from "@/Api";
import { Loader2Icon } from "lucide-react";
import Wrapper from "./Wrapper";

export default function Product({ activepage = "product" }) {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [categories, setCategories] = useState(["all"]);
  const [subcategories, setSubcategories] = useState([]);

  // Get display products based on page and filters
  const displayProducts = activepage === "homepage" ? Data.slice(0, 3) : Data;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (activepage === "homepage") {
          // For homepage, fetch only 3 products
          const result = await fetchCategoryProducts({ categoryName: "all" });
          data = result.data.products.slice(0, 3);
        } else {
          // For product page, fetch filtered products
          const result = await fetchCategoryProducts({
            categoryName: categoryFilter,
            subcategoryName: subcategoryFilter
          });

          data = result.data.products;

          // If we're applying a filter, only show 3 products
          if (categoryFilter !== "all" || subcategoryFilter) {
            data = data.slice(0, 3);
          }
        }

        setData(data);

        // Extract and set unique categories
        if (data.length > 0) {
          const uniqueCategories = ["all", ...new Set(
            data.flatMap(item =>
              item.categories && item.categories.length > 0
                ? item.categories
                : []
            )
          )];
          setCategories(uniqueCategories);

          // Extract subcategories from the selected category
          if (categoryFilter !== "all") {
            const uniqueSubcategories = ["", ...new Set(
              data
                .filter(item =>
                  item.categories &&
                  item.categories.includes(categoryFilter)
                )
                .flatMap(item =>
                  item.subCategories && item.subCategories.length > 0
                    ? item.subCategories
                    : []
                )
            )];
            setSubcategories(uniqueSubcategories);
          } else {
            setSubcategories([]);
          }
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [activepage, categoryFilter, subcategoryFilter]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setSubcategoryFilter(""); // Reset subcategory when category changes
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategory) => {
    setSubcategoryFilter(subcategory);
  };

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
          {displayProducts.map((items, index) => (
            <Link
              className="group h-full"
              key={index}
              href={`/product/${items.slug}`}
            >
              <div className="flex flex-col h-full transform transition-all duration-300 ease-in-out hover:-translate-y-2">
                {/* Card Container - fixed height */}
                <div className="flex flex-col h-full relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image Container - fixed height */}
                  <div className="relative h-[300px] w-full overflow-hidden">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={items.title}
                      width={600}
                      height={300}
                      src={items.image}
                    />
                    {/* Enhanced Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content area - with flex-grow to push button to bottom */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 h-[3.75rem]">
                      {items.title}
                    </h2>
                    <div className="flex justify-between items-center mt-auto">
                      <button className="bg-gray-100 hover:bg-[#f0b827] hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show "View All" button on homepage or when filtered */}
        {(activepage === "homepage" || (categoryFilter !== "all" || subcategoryFilter)) && (
          <div className="w-full text-center pt-8">
            <Link href="/product">
              <button className="bg-[#f0b827] text-white border-0 mt-3 py-3 px-8 rounded-lg">
                View All Products
              </button>
            </Link>
          </div>
        )}
      </Wrapper>
    </>
  );
}
