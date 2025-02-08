"use client";

import { cn } from "@/lib/utils";
import { AssistantMessage } from "@/types";

function Message({ content, role }: AssistantMessage) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "")}>
      <div
        className={cn(
          "w-fit max-w-3xl py-2 px-4 rounded-xl",
          role === "user" ? "bg-secondary" : ""
        )}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;
