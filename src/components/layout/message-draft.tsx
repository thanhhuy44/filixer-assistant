/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader } from "lucide-react";
import Markdown from "react-markdown";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import useAssistant from "@/store/assistant";

function MessageDraft() {
  const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

  const { status, draftMessage, currentRoom } = useAssistant();

  return currentRoom && currentRoom === draftMessage.room ? (
    <div className={cn("flex")}>
      <div className={cn("w-fit py-2 px-4 rounded-xl overflow-hidden")}>
        {status === "LOADING" ? (
          <div className="flex items-center gap-x-1">
            <span className="text-3xl">🤔</span>
            <Loader className="size-5 animate-spin opacity-65" />
          </div>
        ) : status === "DRAFT" ? (
          <div className="">
            <div className="">🤓☝</div>
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
              {draftMessage.content}
            </Markdown>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}

export default MessageDraft;
