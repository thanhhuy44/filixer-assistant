import { create } from 'zustand'

const useDraftMessage = create((set) => ({
  draftMessage: {
    room: "",
    content: ""
  },
  setDraftMesage: (payload:  {room: string, content: string}) => set({ draftMessage: payload })
}))

export default useDraftMessage