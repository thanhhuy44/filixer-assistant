"use client";

import { ReactNode } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import { cn } from "@/lib/utils";

interface Props {
  checkInterval?: number;
  className?: string;
  debounce?: number;
  debug?: boolean;
  followButtonClassName?: string;
  initialScrollBehavior?: "auto" | "smooth";
  mode?: "bottom" | "top";
  nonce?: string;
  scroller?: (values: {
    maxValue: number;
    minValue: number;
    offsetHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => number;
  scrollViewClassName?: string;
  children: ReactNode;
}

function Scroll({ children, ...props }: Props) {
  return (
    <ScrollToBottom
      {...props}
      followButtonClassName={cn("hidden", props.followButtonClassName)}
    >
      <>{children}</>
    </ScrollToBottom>
  );
}

export default Scroll;
