import { z } from "zod";

export const productSchema = z.object({
    name: z.string().trim().min(1, "Product name is required"),
    price: z.number("Price must be a number")
        .gt(0, "Price is required and must be greater than 1"),
    image: z.string().trim().url("Enter a valid image URL"),
});