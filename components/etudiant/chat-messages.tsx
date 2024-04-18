"use client";

import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns";

import { Loader2, ServerCrash } from "lucide-react";

import { useChatScroll } from "@/hooks/use-scroll-top";

import { ChatWelcome } from "./chat-empty";
import { ChatItem } from "./chat-item";
import { Etudiant } from "@prisma/client";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMessagesProps {
  name: string;
  member: Etudiant;
  chatId: string;
}

export const ChatMessages = ({ name, member, chatId }: ChatMessagesProps) => {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  //   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
  //     useChatQuery({
  //       queryKey,
  //       apiUrl,
  //       paramKey,
  //       paramValue,
  //     });
  //   useChatSocket({ queryKey, addKey, updateKey });
  //   useChatScroll({
  //     chatRef,
  //     bottomRef,
  //     loadMore: fetchNextPage,
  //     shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
  //     count: data?.pages?.[0]?.items?.length ?? 0,
  //   });
  //ts@ignore
  // if (status === "pending") {
  //   return (
  //     <div className="flex flex-col flex-1 justify-center items-center">
  //       <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
  //       <p className="text-xs text-zinc-500 dark:text-zinc-400">
  //         Loading messages...
  //       </p>
  //     </div>
  //   );
  // }

  // if (status === "error") {
  //   return (
  //     <div className="flex flex-col flex-1 justify-center items-center">
  //       <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
  //       <p className="text-xs text-zinc-500 dark:text-zinc-400">
  //         Something went wrong!
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 overflow-y-auto"
    ></div>
  );
};
