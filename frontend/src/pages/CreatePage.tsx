import { Box, Container, Heading, Text } from "@chakra-ui/react";
import ProductForm from "../component/ProductForm";
import { useColorModeValue } from "../components/ui/color-mode";

const CreatePage = () => {
  const pageBg = useColorModeValue("gray.50", "gray.950");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.800");

  return (
    <Box minH="100vh" bg={pageBg} py={16}>
      <Container maxW={"480px"}>
        <Box mb={8}>
          <Heading
            as={"h1"}
            fontSize={"2xl"}
            fontWeight={"extrabold"}
            color={headingColor}
            letterSpacing={"tight"}
          >
            New Product
          </Heading>
          <Text color={subTextColor} fontSize={"md"} mt={1}>
            Add the details below to list a new product in your store.
          </Text>
        </Box>

        <Box
          bg={cardBg}
          border={"1px solid"}
          borderColor={cardBorder}
          rounded={"2xl"}
          p={4}
        >
          <ProductForm submitLabel="Add Product" />
        </Box>
      </Container>
    </Box>
  );
};

export default CreatePage;