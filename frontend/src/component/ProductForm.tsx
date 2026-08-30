import { Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useAddProduct from "../hooks/handleAddProduct";
import useUpdateProduct from "../hooks/handleUpdateproduct";
import { useProductStore } from "../store/product-store";
import type { Product, ProductFormProps } from "../utils/types";
import FloatingInput from "./FloatingInput";

const emptyProduct: Product = {
  name: "",
  price: undefined,
  image: "",
};

const ProductForm = ({
  initialValues = emptyProduct,
  submitLabel = "Save",
}: ProductFormProps) => {
  const [product, setProduct] = useState<Product>(initialValues);

  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const setProducts = useProductStore((state) => state.setProducts);
  const setUpdateDialog = useProductStore((state) => state.setUpdateDialog);
  const products = useProductStore((state) => state.products);

  const { updateProduct, isUpdating, isUpdatedSuccessfully } =
    useUpdateProduct();

  const { addProduct, isAdding, isSuccess, data } = useAddProduct();

  const isLoading = isUpdating || isAdding;
  const isEmpty = !product.name || !product.price || !product.image;
  const isUnchanged =
    !!selectedProduct &&
    product.name === initialValues.name &&
    product.price === initialValues.price &&
    product.image === initialValues.image;

  const handleSubmit = async () => {
    if (selectedProduct) {
      const id = selectedProduct._id;
      updateProduct({ id, product });
      if (isUpdatedSuccessfully) {
        setProducts(
          products.map((product) =>
            product._id === id
              ? {
                  ...product,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                }
              : product,
          ),
        );
        setUpdateDialog(false);
      }
    } else {
      addProduct(product);
      if (isSuccess) {
        if (data) {
          setProducts([...products, data]);
        }
        setProduct(emptyProduct);
      }
    }
  };

  return (
    <VStack gap={4} align={"stretch"}>
      <FloatingInput
        label="Product Name"
        name="name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />

      <FloatingInput
        label="Price"
        type="number"
        name="price"
        value={product.price ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          setProduct({
            ...product,
            price: val === "" ? undefined : Number(val),
          });
        }}
      />

      <FloatingInput
        label="Image URL"
        name="image"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />

      <Button
        onClick={handleSubmit}
        loading={isLoading}
        loadingText="Saving..."
        disabled={isLoading || isUnchanged || isEmpty}
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
