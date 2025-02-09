"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import useAssistant from "@/store/assistant";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface Props {
  onSubmit?: (value: string) => void;
}

function MessageInput({ onSubmit }: Props) {
  const [message, setMessage] = useState("");
  const { status } = useAssistant();
  const isDisable = status !== "NONE";

  const onFinish = () => {
    if (onSubmit && message.trim() && !isDisable) {
      onSubmit(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="container">
      <div className="flex items-start gap-x-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 resize-y"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onFinish();
            }
            if (event.shiftKey && event.key === "Enter") {
              event.preventDefault();
              setMessage((prev) => prev + "\n");
            }
          }}
          rows={2}
        />
        <Button
          disabled={status !== "NONE"}
          size="icon"
          onClick={() => {
            onFinish();
          }}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default MessageInput;
