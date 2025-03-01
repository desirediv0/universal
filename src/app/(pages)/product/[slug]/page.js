"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchsingleProduct } from "@/Api";
import Link from "next/link";
import { Loader2Icon, AlertCircle } from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;

      setLoading(true);
      try {
        const response = await fetchsingleProduct(slug);
        if (response && response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  const allImages = useMemo(() => {
    if (!product) return [];

    // Get main image
    const mainImg = product.image || "";

    // Get additional images from the images array
    const additionalImages = product.images && product.images.length > 0
      ? product.images.map(img => img.url).filter(Boolean)
      : [];

    return [mainImg, ...additionalImages].filter(Boolean);
  }, [product]);

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Extract categories from the nested structure
  const categories = useMemo(() => {
    if (!product || !product.categories) return [];

    // Map category names, filter out empty ones
    const categoryNames = product.categories
      .map(item => item.category?.name)
      .filter(Boolean);

    // If no categories or only has "Uncategorized", return ["All"]
    if (categoryNames.length === 0 ||
      (categoryNames.length === 1 && categoryNames[0].toLowerCase() === "uncategorized")) {
      return ["All"];
    }

    // Return categories, replacing "Uncategorized" with "All" if it exists
    return categoryNames.map(name =>
      name.toLowerCase() === "uncategorized" ? "All" : name
    );
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {error || "Product not found"}
        </h2>
        <p className="text-gray-600 mb-4">
          We couldn&apos;t find the product you&apos;re looking for.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative flex justify-center overflow-hidden">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.title}
                height={500}
                width={600}
                priority={true}
                className="w-auto h-auto"
              />
            )}
          </div>
          {allImages.length > 1 && (
            <Carousel className="w-full max-w-xs mx-auto" ref={emblaRef}>
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="p-1">
                      <Card className="hover:shadow-md transition-shadow duration-300">
                        <CardContent className="flex items-center justify-center p-0">
                          {image && (
                            <Image
                              src={image}
                              alt={`${product.title} - Image ${index + 1}`}
                              width={100}
                              height={100}
                              priority={index < 2}
                              className="rounded-md cursor-pointer object-cover hover:opacity-80 transition-opacity duration-300"
                              onClick={() => {
                                setMainImage(image);
                                scrollTo(index);
                              }}
                            />
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          )}
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {product.title}
          </h1>


          {categories.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-[var(--lightcolor)] px-3 py-1 rounded-full text-sm font-medium border shadow-sm cursor-default uppercase"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.shortDesc && (
            <div
              className="text-lg pb-6 break-words overflow-hidden product-content"
              dangerouslySetInnerHTML={{ __html: product.shortDesc }}
            />
          )}

          <Link href={`/contact?subject=${encodeURIComponent(product.title)}`}>
            <button className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md">
              <div className="flex justify-between">
                <IoLogoWhatsapp className="text-white" size={25} />
                <span className="px-4">Contact Now</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
      {product.description && (
        <div className="mt-12">
          <div className="border-b mb-3">
            <h2 className="text-2xl font-semibold text-gray-900 pb-3">
              Full Description
            </h2>
          </div>
          <div
            className="text-lg leading-relaxed break-words overflow-hidden product-content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>
  );
}
