import { Navigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import type { ReactNode } from "react";
import useCheckAuth from "../hooks/useCheckAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useCheckAuth();

  if (isLoading) {
    return (
      <Center minH={"100vh"}>
        <Spinner size="lg" color="purple.500" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children} </>;
};

export default ProtectedRoute;
