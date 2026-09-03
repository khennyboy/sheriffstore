import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "../utils/toast";
import type { OtherProductResponse, Product, ProductDetail } from "../utils/types";

type UpdateParameter = {
    product: Product;
    id: string;
};

type UpdateContext = {
    products: ProductDetail[];
    selectedProduct: ProductDetail | null;
};

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { mutate, isPending, isSuccess } = useMutation<
        OtherProductResponse,
        Error,
        UpdateParameter,
        UpdateContext
    >({
        mutationFn: async ({ id, product }) => {
            const res = await fetch(`/api/products/${id}`, {
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
                    })
                );
                throw new Error(errorJson.message)
            }

            const json = await res.json();
            return json;
        },
        onError: (err,) => {
            toast(false, err.message);
        },
        onSuccess: () => {
            toast(true, "Product updated successfully");
            queryClient.invalidateQueries({ queryKey: ["products", page] });
        },
    });

    return {
        updateProduct: mutate,
        isUpdating: isPending,
        isUpdatedSuccessfully: isSuccess,
    };
};

export default useUpdateProduct;