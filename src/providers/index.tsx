"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

import QueryProvider from "./query";
import RefetchSessionProvider from "./session";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SessionProvider>
        <RefetchSessionProvider>
          {children}
          <Toaster />
        </RefetchSessionProvider>
      </SessionProvider>
    </QueryProvider>
  );
}

export default Providers;
