import router from "@/routes/route.tsx";
import GlobalStyle from "@/style/GlobalStyle.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./reset.css";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
