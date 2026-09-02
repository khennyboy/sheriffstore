import { useState } from "react";
import { Box, IconButton, Input, Text } from "@chakra-ui/react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useColorModeValue } from "../components/ui/color-mode";
import type { FloatingInputProps } from "../utils/types";

const FloatingInput = ({
  label,
  error,
  type,
  ...props
}: FloatingInputProps) => {
  const inputBg = useColorModeValue("gray.100", "gray.800");
  const inputColor = useColorModeValue("gray.900", "white");
  const labelColor = useColorModeValue("gray.500", "gray.400");

  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Box position="relative" h="52px" w="full">
        <Input
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder=" "
          bg={inputBg}
          color={inputColor}
          border="none"
          rounded="xl"
          h="52px"
          pt="22px"
          pb="6px"
          pr={isPassword ? "44px" : undefined}
          fontSize="md"
          _focus={{
            bg: inputBg,
            boxShadow: "0 0 0 2px var(--chakra-colors-purple-500)",
          }}
          css={{
            "&:focus + label, &:not(:placeholder-shown) + label": {
              transform: "translateY(-20px) scale(0.75)",
              fontSize: "0.8rem",
            },
          }}
        />
        <Text
          as="label"
          position="absolute"
          left="16px"
          top="50%"
          transform="translateY(-50%)"
          color={labelColor}
          fontSize="md"
          pointerEvents="none"
          transition="all 0.15s ease"
          transformOrigin="left top"
        >
          {label}
        </Text>

        {isPassword && (
          <IconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            variant="ghost"
            size="sm"
            position="absolute"
            right="6px"
            top="50%"
            transform="translateY(-50%)"
            rounded="lg"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </IconButton>
        )}
      </Box>

      <Text
        color="red.500"
        fontSize="xs"
        my={1}
        minH="16px"
        visibility={error ? "visible" : "hidden"}
      >
        {error || " "}
      </Text>
    </Box>
  );
};

export default FloatingInput;
