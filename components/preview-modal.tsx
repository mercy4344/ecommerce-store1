"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from "./ui/modal";
import ProductDetails from "./product-details";

const PreviewModal = () => {
    const previewModal = usePreviewModal();
    const product = usePreviewModal((state) => state.data);

    if (!product) {
        return null;
    }

    return ( 
        <Modal
            open={previewModal.isOpen}
            onClose={previewModal.onClose}
        >
            <ProductDetails product={product} />
        </Modal>
     );
}
 
export default PreviewModal;