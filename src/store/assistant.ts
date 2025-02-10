import { create } from "zustand";

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
}));

export default useAssistant;
