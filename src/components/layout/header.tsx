"use client";

import { Loader2, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { getFallbackName } from "@/lib/helpers";
import { Link } from "@/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

function Header() {
  const { status, data } = useSession();
  const user = data?.user;
  return (
    <header>
      <div className="container py-2">
        <div className="flex items-center justify-end">
          {status === "loading" ? (
            <Avatar className="size-10">
              <AvatarFallback>
                <Loader2 className="size-5 animate-spin" />
              </AvatarFallback>
            </Avatar>
          ) : status === "authenticated" ? (
            <>
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
                variant="ghost"
                className=""
                onClick={async () => signOut({})}
              >
                <LogOut className="size-5" fontWeight={500} />
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
