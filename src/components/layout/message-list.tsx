"use client";

import { useEffect } from "react";
import { useAtTop } from "react-scroll-to-bottom";

import { AssistantMessage } from "@/types";

import Message from "./message";
import MessageDraft from "./message-draft";
import Scroll from "./scroll";

interface Props {
  messages: AssistantMessage[];
  onScrollToTop?: () => void;
}

function MessageList({ messages, onScrollToTop }: Props) {
  const [atTop] = useAtTop();

  useEffect(() => {
    if (atTop) {
      if (onScrollToTop) {
        onScrollToTop();
      }
    }
  }, [atTop]);

  return (
    <div className="container">
      <div className="space-y-3">
        {messages.map((message) => (
          <Message key={message._id} {...message} />
        ))}
        <MessageDraft />
      </div>
    </div>
  );
}

function MessageListWrap({ messages, ...props }: Props) {
  return (
    <Scroll
      className="!absolute inset-0 size-full overflow-y-auto"
      scrollViewClassName="message-list"
    >
      <MessageList messages={messages} {...props} />
    </Scroll>
  );
}

export default MessageListWrap;
