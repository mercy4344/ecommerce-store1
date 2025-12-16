"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Image as ImageType } from "@/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryProps {
  images: ImageType[];
  selectedColorId?: string | null;
  onColorChange?: (colorId: string | null) => void;
};

const Gallery: React.FC<GalleryProps> = ({ images, selectedColorId, onColorChange }) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [api, setApi] = useState<CarouselApi | null>(null);

  const filteredImages =
    selectedColorId
      ? images.filter(
          (image) =>
            image.colorId === selectedColorId ||
            image.colorId === null ||
            typeof image.colorId === "undefined"
        )
      : images;

  const displayImages =
    filteredImages.length > 0 ? filteredImages : images;

  const handlePrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      const index = api.selectedScrollSnap();
      const current = displayImages[index];
      if (current && typeof onColorChange === "function") {
        onColorChange(current.colorId ?? null);
      }
    };
    api.on("select", handleSelect);
    handleSelect();
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, displayImages, onColorChange]);

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{ loop: true, align: "start", skipSnaps: false }}
      >
        <CarouselContent>
          {displayImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="p-1">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Skeleton className="absolute inset-0 h-full w-full" />
                  <Image
                    fill
                    src={image.url}
                    alt="Product image"
                    className="object-cover object-center"
                    onClick={() => onColorChange?.(image.colorId ?? null)}
                    onLoadingComplete={(img) => {
                      // hide skeleton on load
                      (img as HTMLImageElement).style.opacity = "1";
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious
          className="left-2"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
        />
        <CarouselNext
          className="right-2"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        />

        {/* Thumbnail Navigation (Desktop only) */}
        {isDesktop && (
          <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-4 gap-4 px-8">
              {displayImages.map((image, thumbIdx) => (
                <button
                  key={image.id}
                  onClick={() => {
                    api?.scrollTo(thumbIdx);
                    onColorChange?.(image.colorId ?? null);
                  }}
                  className={`relative aspect-square rounded-md overflow-hidden border ${api?.selectedScrollSnap() === thumbIdx ? "border-black" : "border-transparent"}`}
                >
                  <Image
                    fill
                    src={image.url}
                    alt="Thumbnail"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Gallery;