import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../store/product-store";
import type { GetProductsResponse, ProductDetail } from "../utils/types";

const useGetProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts);

  const { isPending, isError, error, data } = useQuery<ProductDetail[], Error>({
    queryKey: ["products"],
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/products", { signal });

      const json: GetProductsResponse = await res.json();

      if (!json.success) {
        throw new Error(json.message);
      }
      // ts knows that on reaching here success must be true
      setProducts(json.data);
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
