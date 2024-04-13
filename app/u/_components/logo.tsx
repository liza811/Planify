import { font } from "@/components/auth/login-form";
import { currentUser } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = async () => {
  const user = await currentUser();

  return (
    <Link
      href={`/u/${user?.prenom}`}
      className="
    w-full
    flex
    justify-left
    items-center"
    >
      <Image
        src={"/cypresslogo.svg"}
        alt="cypress Logo"
        width={35}
        height={35}
      />
      <span
        className={cn(
          "font-bold dark:text-white  text-3xl first-letter:ml-2 text-primary_purpule",
          font.className
        )}
      >
        Plan
      </span>
    </Link>
  );
};
