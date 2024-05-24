import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

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
        <section className="md:ml-56  h-screen pt-[80px] ">{children}</section>
      </main>
    </SessionProvider>
  );
};

export default DashboardLayout;
