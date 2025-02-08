import { InfiniteData } from "@tanstack/react-query";
import dayjs from "dayjs"

import { ApiResponse } from "@/types";

export const getHello = () => {
  return "Hello";
};

export const getFallbackName = (fullName: string) : string => {
  return fullName
  .split(" ") // Split the name into words
  .filter(word => word.length > 0) // Remove empty strings (in case of extra spaces)
  .map(word => word[0].toUpperCase()) // Get the first letter and uppercase it
  .slice(-2) // Take the last two initials
  .join(""); // Join them together
}

export const flatInfiniteQueryResponse = (data: InfiniteData<ApiResponse>) => {
  return data.pages
  .flat()
  .map((page) => page.data)
  .flat()
}

export const sortListByTime = <T, K extends keyof T>(
  listData: Array<T>,
  timeProperty: K,
  labels?: {
    today: string;
    yesterday: string;
    earlier: string;
  }
) => {
  const todayItems = [];
  const yesterdayItems = [];
  const olderItems = [];
  for (const item of listData) {
    const isToday = dayjs().isSame(dayjs(item[timeProperty] as string), "day");
    const isYesterday = dayjs()
      .subtract(1, "day")
      .isSame(dayjs(item[timeProperty] as string), "day");
    if (isToday) {
      todayItems.push(item);
    } else if (isYesterday) {
      yesterdayItems.push(item);
    } else {
      olderItems.push(item);
    }
  }

  return [
    { title: labels?.today || "Today", data: [...todayItems] },
    {
      title: labels?.yesterday || "Yesterday",
      data: [...yesterdayItems],
    },
    { title: labels?.earlier || "Earlier", data: [...olderItems] },
  ];
};