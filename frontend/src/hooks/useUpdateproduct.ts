import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "../utils/toast";
import type {
    GetProductsSuccessResponse,
    OtherProductResponse,
    Product,
} from "../utils/types";

type UpdateParameter = {
    product: Product;
    id: string;
};

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { mutate, isPending, isSuccess } = useMutation<
        OtherProductResponse,
        Error,
        UpdateParameter
    >({
        mutationFn: async ({ id, product }) => {
            const res = await fetch(`/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!res.ok) {
                const errorJson: OtherProductResponse = await res.json().catch(
                    (): OtherProductResponse => ({
                        success: false,
                        message: "An unknown network error occurred.",
                    }),
                );
                throw new Error(errorJson.message);
            }

            return res.json();
        },
        onError: (err) => {
            toast(false, err.message);
        },
        onSuccess: (_, { id, product }) => {
            toast(true, "Product updated successfully");

            // Directly update the React Query cache using submitted variables
            queryClient.setQueryData<GetProductsSuccessResponse>(
                ["products", page],
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        data: old.data.map((p) =>
                            p._id === id ? { ...p, ...product, updatedAt: new Date().toISOString() } : p
                        ),
                    };
                }
            );
        },
    });

    return {
        updateProduct: mutate,
        isUpdating: isPending,
        isUpdatedSuccessfully: isSuccess,
    };
};

export default useUpdateProduct;