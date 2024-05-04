import { currentUser } from "@/lib/current-user";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { PT_Serif } from "next/font/google";
export const font = PT_Serif({
  subsets: ["latin"],
  weight: ["700"],
});
export const Logo = async () => {
  const user = await currentUser();
  return (
    <Link className="flex  items-center " href={`/u/${user?.prenom}`}>
      <Image
        src={"/cypresslogo.svg"}
        alt="cypress Logo"
        width={35}
        height={35}
      />
      <span
        className={cn(
          "font-bold dark:text-white  text-3xl first-letter:ml-2 text-white",
          font.className
        )}
      >
        Plan
      </span>
    </Link>
  );
};
