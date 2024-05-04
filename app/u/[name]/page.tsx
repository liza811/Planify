import { getConfiguration } from "@/lib/configuration";
import { currentUser } from "@/lib/current-user";
import { getIndisponibilite } from "@/lib/indisponibilite";

import { Poppins } from "next/font/google";

import { ClipLoader } from "react-spinners";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";

import Link from "next/link";
import { AjouterIndispo } from "@/components/enseignant/ajouter-indispo";

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
          Check News!{" "}
        </Typography>
        <div className="flex flex-col gap-y-5 md:gap-y-16 justify-between h-full mt-2">
          <div className="w-full rounded-md bg-[#8968CD] h-24 flex items-center ">
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
              Bienvenue sur la platforme de gestion des plannings des
              soutenances
            </Typography>
          </div>

          <div className="flex flex-col gap-y-4 justify-end">
            <Link
              href={`/u/${user.prenom}/themes`}
              className="w-[45%] rounded-md bg-[#ADD4FF] h-[80px] flex items-center"
            >
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
            </Link>

            <AjouterIndispo />

            <Link
              href={`/u/${user.prenom}/binomes`}
              className=" rounded-md bg-rose-200 h-[80px] flex items-center justify-start w-[45%]"
            >
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
            </Link>

            {/* <Avatar
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
            ></Avatar> */}
          </div>
        </div>
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
