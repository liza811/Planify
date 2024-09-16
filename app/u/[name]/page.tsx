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
    <main className="w-full h-full p-6 bg-white">
      <section className="flex flex-col">
        <div className="w-full rounded-md bg-[#17203F] h-24 flex items-center mt-3 pl-3 justify-between overflow-hidden">
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
          <div className=" items-center hidden lg:flex">
            {/* <Image
              src={"/avatar3.png"}
              width={90}
              height={90}
              alt="avatar"
              className="rounded-full z-20 "
            /> */}
            {/* <Image
              src={"/avatar1.jpg"}
              width={120}
              height={120}
              alt="avatar"
              className="rounded-full "
            />
            <Image
              src={"/avatar2.png"}
              width={110}
              height={110}
              alt="avatar"
              className="rounded-full -ml-16"
            />
            <Image
              src={"/avatar3.png"}
              width={110}
              height={110}
              alt="avatar"
              className="rounded-full -ml-14"
            /> */}
          </div>
        </div>
        <div className="flex  w-full  space-y-5 justify-between h-full items-end  mt-5  md:mt-10">
          <div className="flex flex-col gap-y-4 w-[90%] lg:w-[55%] justify-center">
            <Link
              href={`/u/${user.prenom.toLowerCase()}/themes`}
              className="w-full rounded-md  h-[80px] flex items-center border border-[#93b7dd] shadow-lg hover:shadow-2xl hover:transition-all hover:border-2"
            >
              <Typography
                sx={{
                  color: "#3D007B",

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
              href={`/u/${user.prenom.toLowerCase()}/binomes`}
              className=" rounded-md  h-[80px] flex items-center justify-start w-full  border border-[#9b6bdb] shadow-lg hover:shadow-2xl hover:transition-all hover:border-2"
            >
              <Typography
                sx={{
                  color: "#3D007B",

                  mt: 0,
                  fontSize: 19,
                  mr: 0,
                  marginLeft: 7,
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
