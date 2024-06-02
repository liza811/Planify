import { Loader } from "@/app/u/_components/loader";

import { Suspense } from "react";
import { Messagerie } from "./messagerie";

export interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const MessageriePage = async ({ searchParams, params }: MemberIdPageProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <Messagerie searchParams={searchParams} params={params} />
    </Suspense>
  );
};

export default MessageriePage;
