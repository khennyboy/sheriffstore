import type { InputProps } from "@chakra-ui/react";


export interface Product {
  name: string;
  price: number | undefined;
  image: string;
}

export type ProductFormProps = {
  initialValues?: Product;
  submitLabel?: string;
};

export type FloatingInputProps = InputProps & {
  label: string;
};


export type ProductDetail = Product & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type GetProductsSuccessResponse = {
  success: true;
  data: ProductDetail[];
};

type GetProductsErrorResponse = {
  success: false;
  message: string;
};

export type GetProductsResponse = GetProductsSuccessResponse | GetProductsErrorResponse;
export type ProductCardProps = {
  product: ProductDetail;
};

export type ProductStore = {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  products: ProductDetail[];
  setProducts: (products: ProductDetail[]) => void;
  createProduct: (
    newProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
  // fetchProducts: () => Promise<{ success: boolean; message: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    id: string,
    updatedProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
  selectedProduct: ProductDetail | null;
  setSelectedProduct: (product: ProductDetail | null) => void;
};