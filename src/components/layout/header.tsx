"use client";

import { Loader2, SidebarOpen } from "lucide-react";
import { useSession } from "next-auth/react";

import { Link } from "@/navigation";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import UserDropdown from "./user-downdown";

function Header() {
  const { status } = useSession();
  const { toggleSidebar } = useSidebar();
  return (
    <header>
      <div className="container py-2">
        <div className="flex items-center justify-between">
          <div>
            <button>
              <SidebarOpen onClick={toggleSidebar} />
            </button>
          </div>
          <div>
            {status === "loading" ? (
              <Avatar className="size-10">
                <AvatarFallback>
                  <Loader2 className="size-5 animate-spin" />
                </AvatarFallback>
              </Avatar>
            ) : status === "authenticated" ? (
              <UserDropdown />
            ) : (
              <>
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
