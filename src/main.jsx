import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import GlobalStyle from "./Components/GlobalStyle";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
