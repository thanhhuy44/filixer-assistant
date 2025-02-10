/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Markdown from "react-markdown";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import useAssistant from "@/store/assistant";
import { AssistantMessage } from "@/types";

function Message({ content, role, room }: AssistantMessage) {
  const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;
  const { currentRoom } = useAssistant();

  return currentRoom === room ? (
    <div className={cn("flex", role === "user" ? "justify-end" : "")}>
      <div
        className={cn(
          "w-fit py-2 px-4 rounded-xl overflow-hidden",
          role === "user" ? "bg-secondary max-w-3xl" : ""
        )}
      >
        <div>
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
        </div>
      </div>
    </div>
  ) : null;
}

export default Message;
