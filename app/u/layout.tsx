import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "700", "900"],
});
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <main className=" h-full overflow-y-auto ">
        <nav className="w-full flex fixed md:pl-56 h-[80px] inset-y-0">
          <Navbar />
        </nav>
        <aside className="hidden md:flex flex-col fixed inset-y-0 z-50 w-56">
          <Sidebar />
        </aside>
        <section
          className={cn("md:ml-56  h-screen pt-[80px] ", font.className)}
        >
          {children}
        </section>
      </main>
    </SessionProvider>
  );
};

export default DashboardLayout;
