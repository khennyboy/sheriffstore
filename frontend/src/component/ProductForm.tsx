import { Button, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import useAddProduct from "../hooks/handleAddProduct";
import useUpdateProduct from "../hooks/handleUpdateproduct";
import { useProductStore } from "../store/product-store";
import type { Product, ProductFormProps } from "../utils/types";
import FloatingInput from "./FloatingInput";

const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), "Price must be a number")
    .refine((val) => Number(val) > 0, "Price must be greater than 0"),
  image: z.string().trim().url("Enter a valid image URL"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const emptyProduct: Product = {
  name: "",
  price: "",
  image: "",
};

const ProductForm = ({
  initialValues = emptyProduct,
  submitLabel = "Save",
}: ProductFormProps) => {
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const setProducts = useProductStore((state) => state.setProducts);
  const setUpdateDialog = useProductStore((state) => state.setUpdateDialog);
  const products = useProductStore((state) => state.products);

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
  // true if any field's value has changed from its defaultValues
  const isUnchanged = !!selectedProduct && !isDirty;

  const onSubmit = (values: ProductFormValues) => {
    const product: Product = {
      name: values.name,
      price: values.price,
      image: values.image,
    };

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
          reset(emptyProduct);
        },
      });
    }
  };

  return (
    <VStack
      as="form"
      gap={4}
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
            value={field.value}
            onChange={field.onChange}
            onFocus={(e) => e.target.select()}
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
        disabled={isLoading || isUnchanged || !isValid}
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
