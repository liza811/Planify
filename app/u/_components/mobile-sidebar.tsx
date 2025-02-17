import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden  pr-4 transition hover:opacity-75">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white border-r-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
