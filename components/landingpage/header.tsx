import { cn } from "@/lib/utils";
import Buttonn from "./button";
import { Source_Code_Pro } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const fontt = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["700"],
});
const Header = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6  bg-n-8/90 lg:bg-transparent  lg:backdrop-blur-sm py-4
    
      }`}
    >
      <div className="flex items-center px-2 md:px-5 lg:px-7.5 xl:px-10   justify-between">
        <Link className="block w-[90px] md:w-fit xl:mr-8" href="/">
          <Image src={"/logo-header.png"} width={105} height={40} alt="logo" />
        </Link>

        <div className={cn("mr-0.5", fontt.className)}>
          <Buttonn
            className="text-white  letter uppercase   hover:text-purple-400 text-[0.75rem] px-4 transition-colors"
            href="/login"
          >
            Se connecter
          </Buttonn>
        </div>
      </div>
    </div>
  );
};

export default Header;
