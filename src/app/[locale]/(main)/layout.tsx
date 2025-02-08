import { ReactNode } from "react";

import { Footer, Header } from "@/components/layout";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="min-h-dvh">{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
