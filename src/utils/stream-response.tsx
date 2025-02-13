import { getServerAuthSession } from "./actions";

export const fetchStream = async (
  room: string,
  onStream?: (value: string) => void,
  onDone?: () => void,
  onError?: () => void
) => {
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
};
