import type { InputProps } from "@chakra-ui/react";


export interface Product {
  name: string;
  price: string;
  image: string;
}

export type ProductFormProps = {
  initialValues?: Product;
  submitLabel?: string;
};

export type FloatingInputProps = InputProps & {
  label: string;
  error?: string
};

export type ProductDetail = Product & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// for GET /api/products — returns a LIST
type GetProductsSuccessResponse = {
  success: true;
  data: ProductDetail[];
};

type GetProductsErrorResponse = {
  success: false;
  message: string;
};

export type GetProductsResponse =
  | GetProductsSuccessResponse
  | GetProductsErrorResponse;

// for POST /api/products 
type CreateProductSuccessResponse = {
  success: true;
  data: ProductDetail;
};

type CreateProductErrorResponse = {
  success: false;
  message: string;
};

export type CreateProductResponse =
  | CreateProductSuccessResponse
  | CreateProductErrorResponse;


// for other api's responsee
export type OtherProductResponse = {
  success: boolean,
  message: string
}

export type ProductCardProps = {
  product: ProductDetail;
};

export type ProductStore = {
  updateDialog: boolean;
  setUpdateDialog: (open: boolean) => void;
  products: ProductDetail[];
  setProducts: (products: ProductDetail[]) => void;
  selectedProduct: ProductDetail | null;
  setSelectedProduct: (product: ProductDetail | null) => void;
  deleteDialog: boolean,
  setDeleteDialog: (open: boolean) => void
};


export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};