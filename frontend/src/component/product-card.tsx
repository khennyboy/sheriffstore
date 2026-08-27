import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useColorModeValue } from "../components/ui/color-mode";
import { toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product-store";
import type { ProductCardProps } from "../utils/types";

const ProductCard = ({ product }: ProductCardProps) => {
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const priceBg = useColorModeValue("purple.50", "purple.950");
  const priceColor = useColorModeValue("purple.700", "purple.300");

  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const setIsOpen = useProductStore((state) => state.setIsOpen);
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct,
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    const { success, message } = await deleteProduct(product._id);
    setIsDeleting(false);

    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
      closable: true,
    });
  };

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      rounded={"2xl"}
      overflow={"hidden"}
      transition={"all 0.2s ease"}
      role="group"
      _hover={{ transform: "translateY(-3px)", shadow: "lg" }}
    >
      <AspectRatio ratio={4 / 3}>
        <Image src={product.image} alt={product.name} objectFit={"cover"} />
      </AspectRatio>

      <Box p={4}>
        <Heading as="h3" size="sm" mb={2} lineClamp={1}>
          {product.name}
        </Heading>

        <HStack justify={"space-between"} align={"center"}>
          <Box
            bg={priceBg}
            color={priceColor}
            px={3}
            py={1}
            rounded={"full"}
            fontWeight={"bold"}
            fontSize={"sm"}
          >
            ${product.price}
          </Box>

          <HStack gap={1} transition={"opacity 0.15s ease"}>
            <IconButton
              aria-label="Edit product"
              variant={"ghost"}
              size={"sm"}
              rounded={"lg"}
              disabled={isDeleting}
              onClick={() => {
                setIsOpen(true);
                setSelectedProduct(product);
              }}
            >
              <CiEdit />
            </IconButton>
            <IconButton
              aria-label="Delete product"
              variant={"ghost"}
              size={"sm"}
              rounded={"lg"}
              colorPalette={"red"}
              loading={isDeleting}
              disabled={isDeleting}
              onClick={handleDeleteProduct}
            >
              <MdOutlineDeleteOutline />
            </IconButton>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
