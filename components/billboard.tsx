"use client";

import { Billboard as BillboardType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface BillboardProps {
  data?: BillboardType; // Make data optional to handle loading
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <Skeleton className="w-full h-48 sm:h-64 lg:h-80 rounded-xl bg-gray-300" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="rounded-xl relative aspect-[5/3] sm:aspect-[2.4/1] overflow-hidden bg-gray-100">
        <Skeleton className="absolute inset-0 h-full w-full" />
        <Image
          src={data.imageUrl}
          alt="Billboard"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Billboard;
