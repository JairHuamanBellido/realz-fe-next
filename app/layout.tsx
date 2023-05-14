"use client";
import "reflect-metadata";
import "uno.css";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-darkSurface font-satoshi">
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Provider store={store()}>{children}</Provider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
