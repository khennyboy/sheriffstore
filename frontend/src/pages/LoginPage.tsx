import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useColorModeValue } from "../components/ui/color-mode";
import FloatingInput from "../component/FloatingInput";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "sheriff",
    password: "khenny2020@",
  });
  const { login, isLoading } = useLogin();
  const pageBg = useColorModeValue("gray.50", "gray.950");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.800");
  const subTextColor = useColorModeValue("gray.500", "gray.400");

  const isEmpty = !credentials.username || !credentials.password;

  const handleLogin = async () => {
    await login(credentials);
  };

  return (
    <Box
      minH="100vh"
      bg={pageBg}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Container maxW={"480px"}>
        <VStack gap={2} mb={6}>
          <Box
            w={10}
            h={10}
            rounded={"lg"}
            bg={"purple.500"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            color={"white"}
            fontWeight={"bold"}
          >
            P
          </Box>
          <Heading
            fontSize={"2xl"}
            fontWeight={"extrabold"}
            letterSpacing={"tight"}
          >
            Admin Login
          </Heading>
          <Text color={subTextColor} fontSize={"sm"}>
            Sign in to manage your store
          </Text>
        </VStack>

        <Box
          bg={cardBg}
          border={"1px solid"}
          borderColor={cardBorder}
          rounded={"2xl"}
          py={10}
          px={4}
          w="full"
        >
          <VStack gap={2} align={"stretch"}>
            <FloatingInput
              bg={"yellow.500"}
              label="Username"
              name="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  username: e.target.value.trim(),
                })
              }
            />
            <FloatingInput
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value.trim(),
                })
              }
            />
            <Button
              onClick={handleLogin}
              loading={isLoading}
              disabled={isLoading || isEmpty}
              w={"full"}
              h={"52px"}
              rounded={"xl"}
              colorPalette={"purple"}
              mt={2}
            >
              Log In
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
