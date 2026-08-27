import { useState } from "react";
import { toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product-store";
import type { Product } from "../utils/types";

const useAddProduct = () => {
    const createProduct = useProductStore((state) => state.createProduct);
    const [isLoading, setIsLoading] = useState(false);

    const addProduct = async (newProduct: Product) => {
        setIsLoading(true);
        const { success, message } = await createProduct(newProduct);
        setIsLoading(false);

        toaster.create({
            title: success ? "Success" : "Error",
            description: message,
            type: success ? "success" : "error",
            duration: 3000,
            closable: true,
        });

        return { success, message };
    };

    return { addProduct, isLoading };
};

export default useAddProduct;