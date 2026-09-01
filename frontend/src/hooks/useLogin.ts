import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";

const loginFn = async (credentials: { username: string; password: string }) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], true);
      navigate("/");
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error",
        description: error.message,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });

  return { login: mutation.mutateAsync, isLoading: mutation.isPending };
};

export default useLogin;