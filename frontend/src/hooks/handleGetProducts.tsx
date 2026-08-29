import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../store/product-store";
import toast from "../utils/toast";
import type { GetProductsResponse, ProductDetail } from "../utils/types";

const useGetProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts);

  const { isPending, isError, error, data } = useQuery<ProductDetail[], Error>({
    queryKey: ["products"],
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/products", { signal });
      const json: GetProductsResponse = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(
          !json.success ? json.message : "Failed to fetch products",
        );
      }

      setProducts(json.data);
      toast(true, "Products fetched successfully");
      return json.data;
    },
  });

  return {
    products: data,
    isLoading: isPending,
    error: isError ? error.message : "",
  };
};

export default useGetProducts;
