"use client";

import { useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@/navigation";

import { Button } from "../ui/button";
import RoomsList from "./rooms-list";

function AppSidebar() {
  const { status } = useSession();
  const { openMobile, setOpenMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className="py-5 text-center text-xl font-bold">
        Filixer Assistant
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="gap-0 overflow-hidden">
        <SidebarGroup>
          {status === "authenticated" ? (
            <Link href="/rooms/new" onClick={() => setOpenMobile(!openMobile)}>
              <Button variant="outline" className="w-full">
                New Chat
              </Button>
            </Link>
          ) : null}
        </SidebarGroup>
        <SidebarGroup className="flex-1 overflow-hidden">
          {status === "authenticated" ? (
            <RoomsList />
          ) : status === "loading" ? (
            ""
          ) : (
            ""
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
