import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "../utils/toast";
import type { CreateProductErrorResponse, Product, ProductDetail } from "../utils/types";

const useAddProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const { mutate, isPending, isSuccess, data } = useMutation<
        ProductDetail, // TData — what mutationFn resolves to
        Error,  // TError
        Product // TVariables — what you pass into mutate()
    >({
        mutationFn: async (newProduct) => {
            const res = await fetch("/api/products", {
                method: "POST",
                // credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
            if (!res.ok) {
                const errorJson: CreateProductErrorResponse = await res.json().catch(
                    (): CreateProductErrorResponse => ({
                        success: false,
                        message: "An unknown network error occurred.",
                    })
                );
                throw new Error(errorJson.message)
            }
            const json = await res.json();
            return json.data;
        },
        onSuccess: () => {
            toast(true, "Product created successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/")
        },
        onError: (err) => toast(false, err.message)
    });
    return {
        addProduct: mutate,
        isAdding: isPending,
        isSuccess,
        data
    };
};

export default useAddProduct;