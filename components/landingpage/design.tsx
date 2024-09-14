import Image from "next/image";

export const RightCurve = () => {
  return (
    <div className="hidden absolute top-1/2 left-full w-[10.125rem] -mt-6 ml- pointer-events-none xl:block z-50">
      <Image src={"/curve-2.svg"} width={178} height={86} alt="Curve 2" />
    </div>
  );
};

export const LeftCurve = () => {
  return (
    <div className="hidden absolute top-1/2 right-full w-[32.625rem] -mt-7 -mr-7 pointer-events-none xl:block">
      <Image src={"/curve-1.svg"} width={495} height={180} alt="Curve 1" />
    </div>
  );
};
