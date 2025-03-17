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
import { Loader2Icon, AlertCircle, ArrowLeft } from "lucide-react";
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918859399593";
    const message = encodeURIComponent(`I'm interested in: ${product.title}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

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
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/product" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      {/* Back Button - Mobile Only */}
      <div className="block lg:hidden mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-primary"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-5">
          <div className="relative flex justify-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.title}
                height={600}
                width={700}
                priority={true}
                className="w-full h-auto max-h-[500px] object-contain p-4"
                style={{ width: 'auto', height: 'auto' }}
              />
            )}
          </div>

          {allImages.length > 1 && (
            <Carousel className="w-full max-w-md mx-auto" ref={emblaRef}>
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/4 sm:basis-1/5">
                    <div className="p-1">
                      <Card className={`hover:shadow-md transition-shadow duration-300 ${mainImage === image ? 'ring-2 ring-primary' : ''}`}>
                        <CardContent className="flex items-center justify-center p-1">
                          {image && (
                            <Image
                              src={image}
                              alt={`${product.title} - Image ${index + 1}`}
                              width={100}
                              height={100}
                              priority={index < 2}
                              className="rounded-md cursor-pointer object-cover hover:opacity-80 transition-opacity duration-300"
                              style={{ width: '100%', height: 'auto' }}
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

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>


          </div>

          {categories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
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
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
              <div
                className="text-base text-gray-700 break-words overflow-hidden product-content"
                dangerouslySetInnerHTML={{ __html: product.shortDesc }}
              />
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center space-x-2 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-colors duration-200"
            >
              <IoLogoWhatsapp className="text-white" size={22} />
              <span>Contact on WhatsApp</span>
            </button>


          </div>
        </div>
      </div>

      {product.description && (
        <div className="mt-14 pt-8 border-t border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Product Details
            </h2>
          </div>
          <div
            className="prose prose-lg max-w-none break-words overflow-hidden product-content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>
  );
}
