import Image from "next/image";
import Link from "next/link";

export const Logo = async () => {
  return (
    <Link className="flex justify-start " href={"/"}>
      <Image src={"/1000139820-re.png"} alt="Logo" width={100} height={50} />
    </Link>
  );
};
