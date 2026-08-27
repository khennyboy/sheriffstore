import { useState } from "react";
import { toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product-store";
import type { Product } from "../utils/types";

const useUpdateProduct = () => {
    const updateProduct = useProductStore((state) => state.updateProduct);
    const setIsOpen = useProductStore((state) => state.setIsOpen);
    const [isLoading, setIsLoading] = useState(false);

    const editProduct = async (id: string, updatedProduct: Product) => {
        setIsLoading(true);
        const { success, message } = await updateProduct(id, updatedProduct);
        setIsLoading(false);

        toaster.create({
            title: success ? "Success" : "Error",
            description: message,
            type: success ? "success" : "error",
            duration: 3000,
            closable: true,
        });

        if (success) setIsOpen(false);

        return { success, message };
    };

    return { editProduct, isLoading };
};

export default useUpdateProduct;