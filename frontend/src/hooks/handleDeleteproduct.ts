import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "../utils/toast";
import type { OtherProductResponse } from "../utils/types";


const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isSuccess } = useMutation<
        OtherProductResponse, // TData — what mutationFn resolves to
        Error,         // TError
        string // TVariables — what you pass into mutate()
    >({
        mutationFn: async (id) => {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            const json: OtherProductResponse = await res.json();

            if (!json.success) {
                throw new Error(json.message);
            }

            return json;
        },
        onSuccess: () => {
            toast(true, "Product deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (err) => toast(false, err.message)
    });

    return {
        deleteProduct: mutate,
        isDeleting: isPending,
        isSuccess
    };
};

export default useDeleteProduct;