import { currentUser } from "@/lib/current-user";

import { redirect } from "next/navigation";
import { Typography } from "@mui/material";

import Link from "next/link";

import Image from "next/image";

export interface DatesIndisponibles {
  from: string;
  to: string;
}

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user?.prenom) {
    redirect("/");
  }
  if (user.role) {
    redirect(`/u/${user?.prenom}`);
  }

  return (
    <main className="w-full h-full p-6 bg-white">
      <section className="flex flex-col gap-y-5">
        <div className="w-full rounded-md bg-[#17203F] h-28 flex items-center mt-3 pl-3 justify-between overflow-hidden">
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
            <Image
              src={"/avatar3.png"}
              width={90}
              height={90}
              alt="avatar"
              className="rounded-full z-20 "
            />
            <Image
              src={"/avatar1.jpg"}
              width={110}
              height={110}
              alt="avatar"
              className="rounded-full -ml-8"
            />
            <Image
              src={"/avatar2.png"}
              width={110}
              height={110}
              alt="avatar"
              className="rounded-full -ml-14"
            />
          </div>
        </div>
        <div className="flex  w-full  space-y-5 justify-between h-full items-end  mt-7  md:mt-14">
          <div className="flex flex-col gap-y-4 w-[90%] lg:w-[55%] justify-center">
            <Link
              href={`/u/etudiant/${user.prenom}/themes`}
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
                Voir la liste des thèmes
              </Typography>
            </Link>
            <Link
              href={`/u/etudiant/${user.prenom}/meschoix`}
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
                Voir mes choix
              </Typography>
            </Link>
            <Link
              href={`/u/${user.prenom}/calendar`}
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
                Voir le planning
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
