"use client";

import { Loader2, LogOut, SidebarOpen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { getFallbackName } from "@/lib/helpers";
import { Link, useRouter } from "@/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

function Header() {
  const { status, data } = useSession();
  const user = data?.user;
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
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
              <div className="flex items-center gap-x-1">
                <Avatar className="size-10">
                  <AvatarImage
                    src={user?.avatar.url}
                    alt={user?.fullName}
                    className=""
                  />
                  <AvatarFallback>
                    {getFallbackName(user?.fullName ?? "")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="destructive"
                  className="size-6"
                  onClick={async () => {
                    router.replace("/");
                    await signOut({});
                  }}
                >
                  <LogOut className="size-3" fontWeight={500} />
                </Button>
              </div>
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
