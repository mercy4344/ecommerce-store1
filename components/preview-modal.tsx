"use client";

import { useEffect, useState } from "react";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from "./ui/modal";
import Gallery from "./gallery";
import Info from "./info";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);

  // Ensure default selections so Add to Cart is enabled in the quick view
  useEffect(() => {
    if (!product) return;
    setSelectedColorId(product.colors?.[0]?.id ?? null);
    setSelectedSizeId(product.sizes?.[0]?.id ?? null);
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery
            images={product.images}
            selectedColorId={selectedColorId}
            onColorChange={setSelectedColorId}
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info
            data={product}
            selectedColorId={selectedColorId}
            selectedSizeId={selectedSizeId}
            onColorSelect={setSelectedColorId}
            onSizeSelect={setSelectedSizeId}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;