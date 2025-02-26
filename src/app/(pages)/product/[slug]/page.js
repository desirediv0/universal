"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchProducts } from "@/Api";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    async function loadProducts() {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    }
    loadProducts();
  }, []);

  const currentProduct = products[currentProductIndex] || {};

  const allImages = useMemo(
    () =>
      [currentProduct.image, ...(currentProduct.additionalimage || [])].filter(
        Boolean
      ),
    [currentProduct]
  );

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (currentProduct.image) {
      setMainImage(currentProduct.image);
    }
  }, [currentProduct]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (products.length === 0 || !mainImage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative flex justify-center  overflow-hidden">
            <Image
              src={mainImage}
              alt={currentProduct.title}
              height={500}
              width={600}
              priority="property"
              className="w-auto h-auto "
            />
          </div>
          <Carousel className="w-full max-w-xs mx-auto" ref={emblaRef}>
            <CarouselContent>
              {allImages.map((image, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <div className="p-1">
                    <Card className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="flex items-center justify-center p-0">
                        <Image
                          src={image}
                          alt={`${currentProduct.title} - Image ${index + 1}`}
                          width={100}
                          height={100}
                          priority="property"
                          className="rounded-md cursor-pointer object-cover hover:opacity-80 transition-opacity duration-300"
                          onClick={() => {
                            setMainImage(image);
                            scrollTo(index);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {currentProduct.title}
          </h1>
          {/* <div className="flex items-baseline space-x-2">
            <span className="text-2xl md:text-3xl font-medium hover-color">
              ₹{currentProduct.saleprice}
            </span>
            <span className="text-lg md:text-xl text-gray-500 line-through">
              ₹{currentProduct.price}
            </span>
          </div> */}

          {currentProduct.category && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-[var(--lightcolor)] px-3 py-1 rounded-full text-sm font-medium  border shadow-sm cursor-default">
                  {currentProduct?.category}
                </span>
              </div>
            </div>
          )}

          <p className="text-lg pb-6">{currentProduct.shortdesc}</p>

          <Link href={`/contact?subject=${currentProduct.title}`}>
            <button className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 text-white bg-green-600 hover:bg-green-700  rounded-lg shadow-md">
              <div className="flex justify-between">
              <IoLogoWhatsapp  className="text-white" size={25}/>
                <span className="px-4">Contact Now</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <div className="border-b mb-3">
          <h2 className="text-2xl font-semibold text-gray-900 pb-3">
            Full Description
          </h2>
        </div>
        <p className="text-lg leading-relaxed">{currentProduct.Decription}</p>
      </div>
    </div>
  );
}
