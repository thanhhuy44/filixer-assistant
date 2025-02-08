"use client";

import { AssistantMessage } from "@/types";

import Message from "./message";

interface Props {
  messages: AssistantMessage[];
}

function MessageList({ messages }: Props) {
  return (
    <div className="max-h-full overflow-y-auto">
      <div className="container">
        <div className="space-y-1">
          {messages.map((message) => (
            <Message key={message._id} {...message} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessageList;
