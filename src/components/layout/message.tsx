/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check, Copy } from "lucide-react";
import markdownToTxt from "markdown-to-txt";
import { useCallback, useState } from "react";
import Markdown from "react-markdown";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import useAssistant from "@/store/assistant";
import { AssistantMessage } from "@/types";

import { Button } from "../ui/button";

function Message({ content, role, room }: AssistantMessage) {
  const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;
  const { currentRoom } = useAssistant();
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(markdownToTxt(text));
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error("🚀 ~ onCopy ~ error:", error);
      toast.error("Copy error!");
    }
  }, []);

  return currentRoom === room ? (
    <div className={cn("flex", role === "user" ? "justify-end" : "")}>
      <div
        className={cn(
          "w-fit py-2 px-4 rounded-xl overflow-hidden",
          role === "user" ? "bg-secondary max-w-3xl" : ""
        )}
      >
        <div className="group space-y-1">
          {role === "assistant" ? <div className="">🤓☝</div> : null}
          <Markdown
            className="markdown-container"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={base16AteliersulphurpoolLight}
                    PreTag="div"
                    language={match[1]}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </Markdown>
          {role === "assistant" ? (
            <div className="flex items-center justify-start gap-x-3 opacity-0 duration-150 group-hover:opacity-100">
              <Button
                onClick={() => onCopy(content)}
                variant="ghost"
                size="icon"
              >
                {isCopied ? <Check /> : <Copy />}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
}

export default Message;
