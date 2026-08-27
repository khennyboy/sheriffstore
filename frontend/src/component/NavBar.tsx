import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box
      as="nav"
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW={"1140px"} py={3}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Link to={"/"}>
            <HStack gap={2}>
              <Box
                w={8}
                h={8}
                rounded={"lg"}
                bg={"purple.500"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"white"}
                fontWeight={"bold"}
                fontSize={"sm"}
              >
                P
              </Box>
              <Text
                fontSize={"lg"}
                fontWeight={"bold"}
                letterSpacing={"tight"}
                color={useColorModeValue("gray.900", "white")}
              >
                Product Store
              </Text>
            </HStack>
          </Link>

          <HStack gap={2}>
            <Link to={"/create"}>
              <Button colorPalette="purple" rounded={"lg"} size={"sm"}>
                <LuPlus size={16} />
                <Text display={{ base: "none", sm: "block" }}>New Product</Text>
              </Button>
            </Link>
            <Button
              onClick={toggleColorMode}
              variant={"ghost"}
              rounded={"lg"}
              size={"sm"}
            >
              {colorMode === "light" ? <FaRegMoon /> : <MdOutlineWbSunny />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;