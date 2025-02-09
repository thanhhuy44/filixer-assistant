/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { RoomsApi } from "@/api/rooms";
import { MessageInput, MessageList } from "@/components/layout";
import { flatInfiniteQueryResponse } from "@/lib/helpers";
import useDraftMessage from "@/store/assistant";
import { ApiResponse, Pagination } from "@/types";

function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;
  const { setDraftMesage } = useDraftMessage() as any;

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
  });

  const onSubmit = async (content: string) => {
    try {
      const response = await RoomsApi.sendMessage({ room: id, content });
      console.log("🚀 ~ onSubmit ~ response:", response);
      await messages.refetch();
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error:", error);
      throw new Error("Failed to send message!");
    }
  };

  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch(
        "http://localhost:3030/api/assistants/rooms/67a5b9169d7684168c7582d6/stream",
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4M2E1Mjc2YmQ0ZThjNjE1MjQzOWQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTczODk5NTM4NywiZXhwIjoxNzM5MTY4MTg3fQ.AXSe_UYFEe5hFSiFxg3qskDQhMjImkr2O84NyWfihBU",
          },
        }
      );

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        accumulatedText += decoder.decode(value, { stream: true });
        setDraftMesage({
          room: id,
          content: accumulatedText,
        });
      }
    };

    fetchStream();
  }, []);

  return (
    <div className="flex h-full flex-col gap-y-4 py-5">
      <div className="relative flex-1">
        <div className="absolute inset-0 size-full">
          {messages.isLoading ? (
            <div className="container">loading...</div>
          ) : (
            <MessageList
              messages={
                flatInfiniteQueryResponse(
                  messages.data as InfiniteData<ApiResponse>
                ) ?? []
              }
            />
          )}
        </div>
      </div>
      <MessageInput onSubmit={onSubmit} />
    </div>
  );
}

export default Page;
