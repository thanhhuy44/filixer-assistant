import { create } from "zustand";

import { getServerAuthSession } from "@/utils/actions";

type AssistantStatus = "LOADING" | "DRAFT" | "NONE";

interface State {
  status: AssistantStatus;
  currentRoom: string | "new" | undefined;
  draftMessage: {
    room: string;
    content: string;
  };
  setStatus: (payload: AssistantStatus) => void;
  setCurrentRoom: (payload: string | undefined) => void;
  setDraftMesage: (payload: { room: string; content: string }) => void;
  stream: (payload: {
    room: string;
    onStream?: (value: string) => void;
    onDone?: () => void;
    onError?: () => void;
  }) => void;
}

const useAssistant = create<State>((set) => ({
  status: "NONE",
  currentRoom: "",
  draftMessage: {
    room: "",
    content: "",
  },
  setStatus: (payload: AssistantStatus) => set({ status: payload }),
  setCurrentRoom: (payload: string | undefined) =>
    set({ currentRoom: payload }),
  setDraftMesage: (payload: { room: string; content: string }) =>
    set({ draftMessage: payload }),
  stream: async ({ room, onDone, onError, onStream }) => {
    const session = await getServerAuthSession();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/assistants/rooms/${room}/gemini-stream`,
        {
          headers: {
            authorization: "Bearer " + session?.accessToken,
          },
        }
      );

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          if (onDone) {
            onDone();
          }
          break;
        }

        accumulatedText += decoder.decode(value, { stream: true });
        if (onStream) {
          onStream(accumulatedText);
        }
      }
    } catch (error) {
      console.error("🚀 ~ fetchStream error:", error);
      if (onError) {
        onError();
      } else {
        throw new Error("Failed to fetch stream");
      }
    }
  },
}));

export default useAssistant;
