import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="flex  items-center " href={"/dashboard"}>
      <Image
        src="/logo.png"
        height={120}
        width={120}
        alt="logo"
        className="m-2"
      />
    </Link>
  );
};
