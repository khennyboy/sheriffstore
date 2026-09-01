import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useProductStore } from "../store/product-store";
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

    const setProducts = useProductStore((state) => state.setProducts);
    const setUpdateDialog = useProductStore((state) => state.setUpdateDialog);
    const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

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
        onMutate: async ({ id, product }) => {
            const { products, selectedProduct } = useProductStore.getState();

            setUpdateDialog(false);

            // instantly reflect the edit in the list, no waiting on refetch
            setProducts(
                products.map((p) => (p._id === id ? { ...p, ...product } : p)),
            );

            return { products, selectedProduct }; // snapshot for rollback
        },
        onError: (err, _variables, context) => {
            if (context) {
                setProducts(context.products);
                setSelectedProduct(context.selectedProduct);
                setUpdateDialog(true); // reopen with the original data restored
            }
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