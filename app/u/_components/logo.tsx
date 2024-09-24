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
    <Link className="flex justify-start " href={"/"}>
      <Image
        src={"/1000139820-re.png"}
        alt="cypress Logo"
        width={110}
        height={55}
      />
    </Link>
  );
};
