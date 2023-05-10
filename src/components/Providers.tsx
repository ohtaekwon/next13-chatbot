"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import MsgContext from "@/store/Contexts/Messages";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MsgContext.MessageProvider>{children}</MsgContext.MessageProvider>
    </QueryClientProvider>
  );
};
export default Providers;
