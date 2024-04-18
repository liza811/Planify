import { DatePickerWithRange } from "@/components/enseignant/date-picker";
import { getConfiguration } from "@/lib/configuration";
import { currentUser } from "@/lib/current-user";
import { getIndisponibilite } from "@/lib/indisponibilite";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Calendar as CalendarIcon } from "lucide-react";
import { ResetButton } from "@/components/enseignant/reset-indisponibilite-button";
import { ClipLoader } from "react-spinners";
import { redirect } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

export interface DatesIndisponibles {
  from: string;
  to: string;
}

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user?.prenom) {
    return (
      <main className="flex justify-center items-center">
        <ClipLoader className="text-slate-900" size={30} />
      </main>
    );
  }
  if (!user.role) {
    redirect(`/u/etudiant/${user?.prenom}/themes`);
  }
  const indisponibilites: DatesIndisponibles | any = await getIndisponibilite();

  const indispo =
    indisponibilites?.datesIndisponibles as unknown as DatesIndisponibles;
  const fromDate = indispo?.from;
  const toDate = indispo?.to;

  const configuration = await getConfiguration();
  return (
    <main className=" max-h-[80vh] overflow-y-clip  p-6 bg-[#F9FAFC]">
      <div className="flex max-h-screen flex-row-reverse gap-x-8  justify-between p-6 bg-white">
        <section className="flex flex-col space-y-8 h-[80vh] bg-[#E1E3EE] p-4 rounded-md">
          <div className=" space-y-4">
            <h1
              className={cn(
                "w-full text-center font-semibold text-[17px]",
                font.className
              )}
            >
              Ajouter vos jours d&apos;indisponibilités
            </h1>
            <DatePickerWithRange
              dateDebut={configuration?.dateDebut}
              dateFin={configuration?.dateFin}
            />
          </div>
          {!!indisponibilites && !!indispo && (
            <div className="space-y-4 border-t border-slate-500 w-full py-4 flex flex-col">
              {fromDate === toDate ? (
                <p className="flex justify-between text-slate-700">
                  <span className="w-full flex gap-x-2">
                    <CalendarIcon />`{fromDate}
                  </span>
                </p>
              ) : (
                <>
                  <p className="flex justify-between text-slate-700">
                    <span className="w-full flex gap-x-2">
                      <CalendarIcon />

                      {fromDate}
                    </span>
                  </p>
                  <p className="flex justify-between text-slate-700">
                    <span className="w-full flex gap-x-2 capitalize">
                      <CalendarIcon />
                      {toDate}
                    </span>
                  </p>
                </>
              )}

              <ResetButton />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
{
  /* {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">signOut</button>
      </form> */
}
{
  /* {user?.email}
      <br />
      {user?.id}
      <br />
      {user?.role && "liza"}
      <br />
      {user?.name}
      <br />
      {user?.departementId} */
}
