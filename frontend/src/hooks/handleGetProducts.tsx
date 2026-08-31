import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useProductStore } from "../store/product-store";
import type {
  GetProductsResponse,
  GetProductsSuccessResponse,
} from "../utils/types";

const fetchProducts = async (page: number, signal?: AbortSignal) => {
  const res = await fetch(`/api/products?page=${page}`, { signal });
  const json: GetProductsResponse = await res.json();
  if (!json.success) throw new Error(json.message);
  return json;
};

const useGetProducts = (page: number) => {
  const setProducts = useProductStore((state) => state.setProducts);
  const setCounts = useProductStore((state) => state.setCounts);
  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = useQuery<
    GetProductsSuccessResponse,
    Error
  >({
    queryKey: ["products", page],
    queryFn: ({ signal }) => fetchProducts(page, signal),
    placeholderData: (previousData) => previousData,
  });


  useEffect(() => {
    if (data) {
      setProducts(data.data);
      setCounts(data.totalProducts, data.pageSize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // prefetch neighbors using the same derived totalPages logic
  useEffect(() => {
    if (!data) return;
    const totalPages = Math.max(
      Math.ceil(data.totalProducts / data.pageSize),
      1,
    );

    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: () => fetchProducts(page + 1),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["products", page - 1],
        queryFn: () => fetchProducts(page - 1),
      });
    }
  }, [data, page, queryClient]);

  return {
    isLoading: isPending,
    error: isError ? error.message : "",
  };
};

export default useGetProducts;
