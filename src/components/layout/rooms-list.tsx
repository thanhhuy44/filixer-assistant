/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAtBottom } from "react-scroll-to-bottom";

import { RoomsApi } from "@/api/rooms";
import { flatInfiniteQueryResponse, sortListByTime } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import useAssistant from "@/store/assistant";
import { ApiResponse, AssistantRoom, Pagination } from "@/types";

import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import Scroll from "./scroll";

interface RoomItemProps {
  data: AssistantRoom;
  isActive?: boolean;
}

const Room = ({ data, isActive = false }: RoomItemProps) => {
  const { _id, name } = data;
  const { openMobile, setOpenMobile } = useSidebar();
  return (
    <Link
      href={`/rooms/${_id}`}
      key={_id}
      onClick={() => setOpenMobile(!openMobile)}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start !text-left font-normal line-clamp-1",
          isActive ? "bg-secondary" : ""
        )}
      >
        <p className="line-clamp-1">{name}</p>
      </Button>
    </Link>
  );
};

function RoomsListContent() {
  const { status, currentRoom } = useAssistant();
  const [atBottom] = useAtBottom();

  const rooms = useInfiniteQuery({
    queryKey: ["rooms-infinitie"],
    queryFn: async ({ pageParam }) => {
      try {
        return await RoomsApi.getAll({
          page: pageParam,
          limit: 50,
          sortBy: "updatedAt",
        });
      } catch (e) {
        console.error(e);

        throw new Error("Failed to fetch rooms");
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

  useEffect(() => {
    rooms.refetch();
  }, [status]);

  useEffect(() => {
    if (atBottom && rooms.hasNextPage) {
      rooms.fetchNextPage();
    }
  }, [atBottom]);

  return rooms.isLoading ? (
    <></>
  ) : (
    <div className="room-list">
      <div className="size-full space-y-4">
        {sortListByTime(
          flatInfiniteQueryResponse(rooms.data as InfiniteData<ApiResponse>),
          "updatedAt"
        ).map((item) =>
          item.data.length ? (
            <div key={item.title} className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                {item.title}
              </h3>
              <div className="space-y-1">
                {item.data.map((item: AssistantRoom) => (
                  <div key={item._id}>
                    <Room data={item} isActive={currentRoom === item._id} />
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

function RoomList() {
  return (
    <Scroll
      scrollViewClassName="room-list"
      mode="top"
      className="overflow-y-auto"
    >
      <RoomsListContent />
    </Scroll>
  );
}

export default RoomList;
