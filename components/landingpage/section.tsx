import SectionSvg from "./sectionSvg";

interface propse{
  crosses?: boolean;
  className?: string;
  id:string;
  customPaddings?: 
  boolean;
  crossesOffset?: string;
  children:React.ReactNode
}
const Section = ({children,id,className,crosses,crossesOffset,customPaddings}:propse) => {
  return (
    <div
      id={id}
      className={`
      relative 
      ${
        customPaddings ||
        `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""}`
      } 
      ${className || ""}`}
    >
      {children}

      <div className="hidden absolute top-0 left-5 w-[0.25px] h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10 z-50" />
      <div className="hidden absolute top-0 right-5 w-[0.25px] h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10 z-50" />

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 right-10`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  );
};

export default Section;
