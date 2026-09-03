import { Button, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import useAddProduct from "../hooks/useAddProduct";
import useUpdateProduct from "../hooks/useUpdateproduct";
import { useProductStore } from "../store/product-store";
import type { Product, ProductFormProps } from "../utils/types";
import FloatingInput from "./FloatingInput";
import { useShallow } from "zustand/react/shallow";
import { productSchema } from "../utils/schema";

type ProductFormValues = z.infer<typeof productSchema>;

// the begining of the function
const ProductForm = ({ submitLabel = "Save" }: ProductFormProps) => {
  const { selectedProduct, setProducts, products, setUpdateDialog } =
    useProductStore(
      useShallow((state) => ({
        selectedProduct: state.selectedProduct,
        setProducts: state.setProducts, // still needed for the ADD path below
        products: state.products, // still needed for the ADD path below
        setUpdateDialog: state.setUpdateDialog,
      })),
    );

  const initialValues: Product = {
    name: selectedProduct?.name || "",
    price: selectedProduct?.price ?? (undefined as unknown as number),
    image: selectedProduct?.image || "",
  };

  const { updateProduct, isUpdating } = useUpdateProduct();
  const { addProduct, isAdding } = useAddProduct();

  const isLoading = isUpdating || isAdding;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });
  const onSubmit = (values: ProductFormValues) => {
    const product: Product = {
      name: values.name,
      price: values.price,
      image: values.image,
    };
    console.log(product);
    if (selectedProduct) {
      const id = selectedProduct._id;
      updateProduct(
        { id, product },
        {
          onSuccess: () => {
            setProducts(
              products.map((p) => (p._id === id ? { ...p, ...product } : p)),
            );
            setUpdateDialog(false);
          },
        },
      );
    } else {
      addProduct(product, {
        onSuccess: (data) => {
          if (data) setProducts([...products, data]);
          reset(initialValues);
        },
      });
    }
  };

  return (
    <VStack
      as="form"
      gap={1}
      align={"stretch"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Product Name"
            name="name"
            value={field.value}
            onChange={field.onChange}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Price"
            type="number"
            name="price"
            value={field.value === 0 || !field.value ? undefined : field.value}
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(Number(val));
            }}
            error={errors.price?.message}
          />
        )}
      />

      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Image URL"
            name="image"
            value={field.value}
            onChange={field.onChange}
            error={errors.image?.message}
          />
        )}
      />

      <Button
        type="submit"
        loading={isLoading}
        loadingText="Saving..."
        disabled={isLoading || !isDirty || !isValid}
        h={"52px"}
        rounded={"xl"}
        colorPalette={"purple"}
        color={"white"}
        fontWeight={"semibold"}
        fontSize={"md"}
        mt={2}
      >
        {submitLabel}
      </Button>
    </VStack>
  );
};

export default ProductForm;
