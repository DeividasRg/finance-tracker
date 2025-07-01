"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
