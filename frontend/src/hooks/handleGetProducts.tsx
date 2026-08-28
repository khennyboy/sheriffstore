import { useState } from "react";
import { toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product-store";

const useGetProducts = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getProducts = async () => {
    setIsLoading(true);
    const { success, message } = await fetchProducts();
    setIsLoading(false);
    if (!success) {
      setError(message);
    }

    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
      closable: true,
    });

    return null;
  };

  return { getProducts, isLoading, error };
};

export default useGetProducts;
