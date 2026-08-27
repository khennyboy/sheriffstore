import { Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>(initialValues);

  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const { editProduct, isLoading: isUpdating } = useUpdateProduct();
  const { addProduct, isLoading: isAdding } = useAddProduct();

  const isLoading = isUpdating || isAdding;
  const isEmpty = !product.name || !product.price || !product.image;
  const isUnchanged =
    !!selectedProduct &&
    product.name === initialValues.name &&
    product.price === initialValues.price &&
    product.image === initialValues.image;

  const handleSubmit = async () => {
    if (selectedProduct) {
      await editProduct(selectedProduct._id, product);
    } else {
      await addProduct(product);
      setProduct(emptyProduct);
      navigate("/");
    }
  };

  return (
    <VStack gap={4} align={"stretch"} >
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