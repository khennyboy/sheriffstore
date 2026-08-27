import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPackageOpen } from "react-icons/lu";
import ProductCard from "../component/product-card";
import { useProductStore } from "../store/product-store";
import { useShallow } from "zustand/shallow";
import { useColorModeValue } from "../components/ui/color-mode";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore(
    useShallow((state) => ({
      fetchProducts: state.fetchProducts,
      products: state.products,
    })),
  );
  const [isLoading, setIsLoading] = useState(true);
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const emptyBg = useColorModeValue("white", "gray.900");
  const emptyBorder = useColorModeValue("gray.200", "gray.800");

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await fetchProducts();
      setIsLoading(false);
    };
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW={"1140px"} py={12}>
      <VStack gap={10} align={"stretch"}>
        <VStack gap={1} align={"start"}>
          <Heading
            fontSize={"3xl"}
            fontWeight={"extrabold"}
            letterSpacing={"tight"}
          >
            Your Products
          </Heading>
          <Text color={subTextColor} fontSize={"md"}>
            {isLoading
              ? "Loading your catalog…"
              : `${products.length} product${products.length === 1 ? "" : "s"} in your store`}
          </Text>
        </VStack>

        {isLoading ? (
          <Center py={24}>
            <Spinner size="lg" color="purple.500" />
          </Center>
        ) : products.length === 0 ? (
          <Box
            bg={emptyBg}
            border="1px solid"
            borderColor={emptyBorder}
            rounded={"2xl"}
            py={20}
          >
            <VStack gap={3}>
              <Box color={subTextColor}>
                <LuPackageOpen size={40} />
              </Box>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                No products yet
              </Text>
              <Text
                color={subTextColor}
                fontSize={"sm"}
                maxW={"280px"}
                textAlign={"center"}
              >
                Start building your catalog by adding your first product.
              </Text>
              <Link to={"/create"}>
                <Text
                  color={"purple.500"}
                  fontWeight={"semibold"}
                  fontSize={"sm"}
                  _hover={{ textDecoration: "underline" }}
                  mt={2}
                >
                  Create a product →
                </Text>
              </Link>
            </VStack>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w={"full"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
