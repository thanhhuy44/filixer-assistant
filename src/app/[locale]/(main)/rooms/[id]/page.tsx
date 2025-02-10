/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect } from "react";

import { RoomsApi } from "@/api/rooms";
import { MessageInput, MessageList } from "@/components/layout";
import { flatInfiniteQueryResponse } from "@/lib/helpers";
import { useRouter } from "@/navigation";
import useAssistant from "@/store/assistant";
import { ApiResponse, Pagination } from "@/types";
import { fetchStream } from "@/utils/stream-response";

function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;
  const isNew = id === "new";
  const { replace } = useRouter();
  const { status, setDraftMesage, setStatus, setCurrentRoom } = useAssistant();

  const messages = useInfiniteQuery({
    queryKey: ["room-messages"],
    queryFn: async ({ pageParam }) => {
      try {
        return await RoomsApi.getMessages(id, {
          page: pageParam,
          limit: 50,
          sortBy: "createdAt",
          sortDirection: "asc",
        });
      } catch (e) {
        console.error(e);
        setCurrentRoom(undefined);
        throw new Error("Failed to fetch messages");
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse) => {
      const pagination = lastPage.pagination as Pagination;
      return lastPage.pagination
        ? pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined
        : undefined;
    },
    getPreviousPageParam: (lastPage: ApiResponse) => {
      const pagination = lastPage.pagination as Pagination;
      return lastPage.pagination
        ? pagination.page > 1
          ? pagination.page - 1
          : undefined
        : undefined;
    },
    enabled: isNew || !id ? false : true,
    refetchOnMount: true,
  });

  const onSubmit = useCallback(
    async (content: string) => {
      try {
        const response = await RoomsApi.sendMessage({
          room: isNew ? undefined : id,
          content,
        });
        const room = response.data.room;
        if (isNew) {
          replace("/rooms/" + room);
        } else {
          await messages.refetch();
        }
        setStatus("LOADING");
        setCurrentRoom(room);
        setDraftMesage({
          room,
          content: "",
        });
        await fetchStream(
          room,
          (value) => {
            setStatus("DRAFT");
            setDraftMesage({
              room,
              content: value,
            });
          },
          async () => {
            setDraftMesage({
              room: "",
              content: "",
            });
            setStatus("NONE");
            if (!isNew) {
              await messages.refetch();
            }
          },
          () => {
            setDraftMesage({
              room: "",
              content: "",
            });
            setStatus("NONE");
          }
        );
      } catch (error) {
        console.error("🚀 ~ onSubmit ~ error:", error);
        throw new Error("Failed to send message!");
      }
    },
    [id]
  );

  useEffect(() => {
    setCurrentRoom(id);
  }, [id]);

  useEffect(() => {
    if (!isNew) {
      messages.refetch();
    }
  }, [status, isNew]);

  return (
    <div className="flex h-full flex-col gap-y-4 py-5">
      <div className="relative flex-1">
        {messages.isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : isNew ? (
          <></>
        ) : (
          <MessageList
            messages={
              flatInfiniteQueryResponse(
                messages.data as InfiniteData<ApiResponse>
              ) ?? []
            }
            onScrollToTop={() => {
              if (messages.hasNextPage) {
                messages.fetchNextPage();
              }
            }}
          />
        )}
      </div>
      <MessageInput onSubmit={onSubmit} />
    </div>
  );
}

export default Page;
