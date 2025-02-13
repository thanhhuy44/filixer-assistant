"use client";

import { ArrowDown } from "lucide-react";
import { useAtBottom, useScrollToBottom } from "react-scroll-to-bottom";

import { cn } from "@/lib/utils";

function ToBottomButton() {
  const [atBottom] = useAtBottom();
  const scrollToBottom = useScrollToBottom();
  return (
    <div
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 duration-150",
        !atBottom ? "opacity-100" : "opacity-0"
      )}
    >
      <button
        onClick={() => {
          scrollToBottom();
        }}
        className="flex size-6 items-center justify-center rounded-full border border-primary bg-secondary"
      >
        <ArrowDown className="size-4" />
      </button>
    </div>
  );
}

export default ToBottomButton;
