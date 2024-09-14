import Image from "next/image";

export const Gradient = () => {
  return (
    <div className="absolute top-[10.25rem] -right-[56.375rem] w-[36.625rem] opacity-[24%] mix-blend-color-dodge pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2 overflow-hidden">
        <Image
          className="w-full rotate-180"
          src={"/gradient.png"}
          width={942}
          height={942}
          alt="Gradient"
        />
      </div>
    </div>
  );
};
