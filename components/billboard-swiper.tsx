"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Billboard } from "@/types";

interface BillboardSwiperProps {
  billboards: Billboard[];
}

const BillboardSwiper: React.FC<BillboardSwiperProps> = ({ billboards }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    if (billboards.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % billboards.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [billboards.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % billboards.length);
  };


  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (billboards.length === 0) {
    return null;
  }

  // If only one billboard, render it without swiper functionality
  if (billboards.length === 1) {
    return (
      <div className="p-2 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <div className="rounded-xl relative aspect-[3/2] md:aspect-[2.4/1] overflow-hidden bg-gray-100">
          <Skeleton className="absolute inset-0 h-full w-full" />
          <Image src={billboards[0]?.imageUrl} alt="Billboard" fill className="object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-2 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="relative aspect-[3/2] md:aspect-[2.4/1] overflow-hidden rounded-xl">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {billboards.map((billboard) => (
            <div key={billboard.id} className="w-full flex-shrink-0 relative">
              <div className="relative h-full w-full aspect-[3/2] md:aspect-[2.4/1]">
                <Skeleton className="absolute inset-0 h-full w-full" />
                <Image src={billboard.imageUrl} alt="Billboard" fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {billboards.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => goToSlide(dotIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                dotIndex === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillboardSwiper;