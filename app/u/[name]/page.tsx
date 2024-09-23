import { currentUser } from "@/lib/current-user";

import { redirect } from "next/navigation";
import { Typography } from "@mui/material";

import Link from "next/link";
import { AjouterIndispo } from "@/components/enseignant/ajouter-indispo";
import Image from "next/image";

export interface DatesIndisponibles {
  from: string;
  to: string;
}

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user || !user?.prenom) {
    redirect("/login");
  }
  if (!user.role) {
    redirect(`/u/etudiant/${user?.prenom.toLowerCase()}/themes`);
  }

  return (
    <main className="w-full h-full p-3 lg:p-6 bg-white">
      <section className="flex flex-col">
        <div className="w-full rounded-md bg-[#17203F] h-24 flex items-center mt-3 px-1 lg:px-3 overflow-hidden  text-xl">
          <Typography
            sx={{
              color: "#FFFFFF",
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
        <div className="flex  w-full  space-y-5 justify-between h-full items-end  mt-5  md:mt-10">
          <div className="flex flex-col gap-y-4 w-[100%] md:w-[90%] lg:w-[55%] justify-center">
            <Link
              href={`/u/${user.prenom.toLowerCase()}/themes`}
              className="w-full rounded-md  h-[80px] flex items-center border border-[#93b7dd] text-center justify-center md:justify-start md:pl-14 shadow-lg hover:shadow-2xl hover:transition-all hover:border-2"
            >
              <Typography
                sx={{
                  color: "#3D007B",

                  mt: 0,
                  fontSize: 19,
                  mr: 0,

                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Ajouter un nouveau thème
              </Typography>
            </Link>

            <AjouterIndispo />

            <Link
              href={`/u/${user.prenom.toLowerCase()}/binomes`}
              className=" rounded-md  h-[80px] flex  items-center text-center justify-center md:justify-start md:pl-14 w-full  border border-[#9b6bdb] shadow-lg hover:shadow-2xl hover:transition-all hover:border-2"
            >
              <Typography
                sx={{
                  color: "#3D007B",

                  mt: 0,
                  fontSize: 19,
                  mr: 0,

                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Voir les binomes
              </Typography>
            </Link>
          </div>
          <div className="w-[50%] hidden lg:flex justify-center items-center">
            <Image
              src={"/schedule.png"}
              width={470}
              height={470}
              alt="calendar"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
