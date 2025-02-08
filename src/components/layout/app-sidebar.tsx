import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link } from "@/navigation";

import { Button } from "../ui/button";
import RoomsList from "./rooms-list";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Filixer Assistant</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <Link href="/rooms/new">
            <Button variant="outline" className="w-full">
              New Chat
            </Button>
          </Link>
        </SidebarGroup>
        <SidebarGroup className="h-full">
          <RoomsList />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
