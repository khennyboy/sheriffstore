import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product-store";
import type { ProductCardProps } from "../utils/types";

const ProductCard = ({ product }: ProductCardProps) => {
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const priceBg = useColorModeValue("purple.50", "purple.950");
  const priceColor = useColorModeValue("purple.700", "purple.300");
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct,
  );
  const setUpdateDialog = useProductStore((state) => state.setUpdateDialog);
  const setDeleteDialog = useProductStore((state) => state.setDeleteDialog);
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
        <Image
          src={product.image}
          alt={product.name}
          loading="lazy"
          objectFit={"cover"}
        />
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
              onClick={() => {
                setUpdateDialog(true);
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
              onClick={() => {
                setDeleteDialog(true);
                setSelectedProduct(product);
              }}
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
