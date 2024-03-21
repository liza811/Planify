import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid place-content-center  bg-slate-100 h-full w-full ">
      {children}
      <Image
        src="/login_1.svg"
        className="hidden lg:block absolute bottom-0 left-0 w-[25%]"
        height={500}
        width={500}
        alt="login1"
      />
      <Image
        src="/login_2.svg"
        className="hidden lg:block absolute bottom-0 right-0 w-[25%]"
        height={500}
        width={500}
        alt="login2"
      />
    </main>
  );
};

export default AuthLayout;
