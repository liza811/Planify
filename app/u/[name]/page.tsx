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
import { Avatar, Box, Typography } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Link from "next/link";

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
    <main className="w-full h-full p-6 bg-white">
      <Box>
        <Typography
          sx={{
            color: "#9654B8",
            fontFamily: "monospace",
            mt: 2,
            fontSize: 28,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          Check News !{" "}
        </Typography>

        <div className="w-full rounded-md bg-purple-500 h-11">
          <Typography
            sx={{
              color: "#3D007B",
              fontFamily: "monospace",
              mt: 0,
              fontSize: 20,
              mr: 0,
              marginLeft: 1,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            Bienvenue sur la platforme de gestion des plannings des soutenances
          </Typography>
        </div>

        <Box display="flex">
          <Box display="flow">
            <div className="w-full rounded-md bg-blue-200 h-11">
              <Typography
                sx={{
                  color: "#3D007B",
                  fontFamily: "monospace",
                  mt: 0,
                  fontSize: 19,
                  mr: 0,
                  marginLeft: 7,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Ajouter un nouveau thème
              </Typography>
            </div>

            <div className="w-full rounded-md bg-yellow-100 h-11">
              <Typography
                sx={{
                  color: "#3D007B",
                  fontFamily: "monospace",
                  mt: 0,
                  fontSize: 19,
                  mr: 0,
                  marginLeft: 7,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Déclarer mes jours d&apos;indisponibilités
              </Typography>
            </div>

            <div className="w-full rounded-md bg-rose-200 h-11">
              <Typography
                sx={{
                  color: "#3D007B",
                  fontFamily: "monospace",
                  mt: 0,
                  fontSize: 19,
                  mr: 0,
                  marginLeft: 7,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Voir mes binoms
              </Typography>
            </div>
          </Box>
          <Avatar
            sx={{
              mx: "auto",
              width: 384,
              height: 380,
              my: 0.5,
              mt: 7,
              mr: 0,
              ml: 17,
              transition: "0.25s",
            }}
            alt="Remy Sharp"
            src="https://netcombcc.com/wp-content/uploads/2021/01/Icono-65-1.png"
            variant="square"
          ></Avatar>
        </Box>
      </Box>
    </main>

    // {/* <div className="flex max-h-screen flex-row-reverse gap-x-8  justify-between p-6 bg-white">
    //   <section className="flex flex-col space-y-8 h-[80vh] bg-[#E1E3EE] p-4 rounded-md">
    //     <div className=" space-y-4">
    //       <h1
    //         className={cn(
    //           "w-full text-center font-semibold text-[17px]",
    //           font.className
    //         )}
    //       >
    //         Ajouter vos jours d&apos;indisponibilités
    //       </h1>
    //       <DatePickerWithRange
    //         dateDebut={configuration?.dateDebut}
    //         dateFin={configuration?.dateFin}
    //       />
    //     </div>
    //     {!!indisponibilites && !!indispo && (
    //       <div className="space-y-4 border-t border-slate-500 w-full py-4 flex flex-col">
    //         {fromDate === toDate ? (
    //           <p className="flex justify-between text-slate-700">
    //             <span className="w-full flex gap-x-2">
    //               <CalendarIcon />`{fromDate}
    //             </span>
    //           </p>
    //         ) : (
    //           <>
    //             <p className="flex justify-between text-slate-700">
    //               <span className="w-full flex gap-x-2">
    //                 <CalendarIcon />

    //                 {fromDate}
    //               </span>
    //             </p>
    //             <p className="flex justify-between text-slate-700">
    //               <span className="w-full flex gap-x-2 capitalize">
    //                 <CalendarIcon />
    //                 {toDate}
    //               </span>
    //             </p>
    //           </>
    //         )}

    //         <ResetButton />
    //       </div>
    //     )}
    //   </section>
    // </div> */}
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
