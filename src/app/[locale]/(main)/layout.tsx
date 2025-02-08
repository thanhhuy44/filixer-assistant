import { ReactNode } from "react";

import { Header } from "@/components/layout";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex h-dvh flex-1 flex-col">
          <Header />
          <div className="flex-1">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default MainLayout;
