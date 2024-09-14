import Link from "next/link";
import ButtonSvg from "./button-svg";

//@ts-ignore
const Buttonn = ({ className, href, children }) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    className || ""
  }`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg()}
    </button>
  );

  const renderLink = () => (
    <Link href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg()}
    </Link>
  );

  return href ? renderLink() : renderButton();
};

export default Buttonn;
