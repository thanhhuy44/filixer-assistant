/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Markdown from "react-markdown";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import useDraftMessage from "@/store/assistant";

function MessageDraft() {
  const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

  const { draftMessage } = useDraftMessage() as any;
  console.log("🚀 ~ MessageDraft ~ draftMessage:", draftMessage);

  return (
    <div className={cn("flex")}>
      <div className={cn("w-fit py-2 px-4 rounded-xl overflow-hidden")}>
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
    </div>
  );
}

export default MessageDraft;
