import Image from "next/image";
interface NotFoundProps {
  header: string;
  paragraph: string;
  src?: string;
  size?: number;
}

export const NothingFound = ({
  header,
  paragraph,
  src,
  size,
}: NotFoundProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <Image
        src={src || "/search-magnifying.png"}
        height={size || 100}
        width={size || 100}
        alt="nothing-found"
      />
      <h1 className="text-xl md:text-xl text-foreground font-bold p-2">
        {header}
      </h1>
      <p className=" text-muted-foreground">{paragraph}</p>
    </div>
  );
};
