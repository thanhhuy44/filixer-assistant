"use client";

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { getFallbackName } from "@/lib/helpers";
import { useRouter } from "@/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function UserDropdown() {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;
  return (
    <div className="flex items-center gap-x-1">
      <Popover>
        <PopoverTrigger>
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
        </PopoverTrigger>
        <PopoverContent className="w-[160px] px-0 py-2">
          <Button
            onClick={async () => {
              await signOut({
                redirect: false,
              });
              router.replace("/");
            }}
            className="w-full rounded-none"
            variant="ghost"
          >
            Sign out
            <LogOut />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default UserDropdown;
