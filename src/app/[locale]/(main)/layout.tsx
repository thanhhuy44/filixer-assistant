import { ReactNode } from "react";

import { Footer, Header } from "@/components/layout";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <div className="min-h-dvh">{children}</div>
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}

export default MainLayout;
