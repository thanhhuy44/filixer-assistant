"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { RoomsApi } from "@/api/rooms";
import { flatInfiniteQueryResponse, sortListByTime } from "@/lib/helpers";
import { Link } from "@/navigation";
import { ApiResponse, AssistantRoom, Pagination } from "@/types";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

function RoomsList() {
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

  return (
    <ScrollArea className="h-full">
      {rooms.isLoading ? (
        <></>
      ) : (
        <div>
          {sortListByTime(
            flatInfiniteQueryResponse(rooms.data as InfiniteData<ApiResponse>),
            "createdAt"
          ).map((item) =>
            item.data.length ? (
              <div key={item.title} className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <div>
                  {item.data.map((item: AssistantRoom) => (
                    <Link href={`/rooms/${item._id}`} key={item._id}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start !text-left font-normal"
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </ScrollArea>
  );
}

export default RoomsList;
