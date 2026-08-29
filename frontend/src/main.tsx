import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "../src/index.css";
import { Provider } from "./components/ui/provider.tsx";
import ScrollToTop from "./component/ScrolltoTop.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast from "./utils/toast.ts";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast(false, error.message);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 3000,
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
