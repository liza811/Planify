import { UserButton } from "@/components/auth/user-button";
import { ChatInput } from "@/components/etudiant/chat-input";
import { ChatMessages } from "@/components/etudiant/chat-messages";
import { MediaRoom } from "@/components/etudiant/media-room";
import { ChatVideoButton } from "@/components/etudiant/video-button";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MemberIdPageProps } from "./page";

export const Messagerie = async ({ searchParams }: MemberIdPageProps) => {
  const profile = await currentUser();

  if (!profile) {
    return redirect("/login");
  }
  if (profile.role) {
    return redirect("/login");
  }

  const currentMember = await db.etudiant.findFirst({
    where: {
      id: profile.id,
    },
    select: {
      binome: {
        include: {
          etudiants: true,
        },
      },
    },
  });

  if (!currentMember) {
    return redirect("/login");
  }

  const me =
    currentMember.binome?.etudiants[0].id === profile.id
      ? currentMember.binome?.etudiants[0]
      : currentMember.binome?.etudiants[1];

  const otherMember =
    currentMember.binome?.etudiants[0].id === profile.id
      ? currentMember.binome?.etudiants[1]
      : currentMember.binome?.etudiants[0];

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        {/* <MobileToggle serverId={serverId} /> */}

        <p className="font-semibold text-md text-black dark:text-white">
          {otherMember?.nom} {otherMember?.prenom}
        </p>
        <div className="ml-auto flex items-center">{<ChatVideoButton />}</div>
      </div>
      {searchParams.video && (
        <MediaRoom
          chatId={currentMember.binome?.id!}
          video={true}
          audio={true}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            member={otherMember!}
            name={otherMember?.nom!}
            chatId={currentMember.binome?.id!}
          />
          <ChatInput name={`${otherMember?.nom} ${otherMember?.prenom}`} />
        </>
      )}
    </div>
  );
};
