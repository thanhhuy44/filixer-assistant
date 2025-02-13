import { Metadata } from "next";

import { RoomsApi } from "@/api/rooms";
import { AssistantRoom, PageProps } from "@/types";

import View from "../(component)/view";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const id = params.id;
  if (id === "new") {
    return {
      title: "New Chat | Filixer",
    };
  }
  try {
    const response = await RoomsApi.getOne(id);
    const room: AssistantRoom = response.data;
    return {
      title: room.name,
    };
  } catch (error) {
    console.error("🚀 ~ generateMetadata ~ error:", error);
    throw new Error("Failed to fetch room");
  }
};

function Page({ params }: PageProps) {
  return <View id={params.id} />;
}

export default Page;
