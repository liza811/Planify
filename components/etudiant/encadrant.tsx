import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export interface EncadrantProps {
  Binome?: {
    etudiants: Etudiant[];
  };
  Theme: {
    nom: string;
  };
  encadrent?: Enseignant | null;
}

interface Etudiant {
  nom: string;
  prenom: string;
  email: string;
}

interface Enseignant {
  nom: string;
  prenom: string;
  email: string;
}
export const InfoEncadrant = ({ encadrant }: { encadrant: EncadrantProps }) => {
  return (
    <section className="flex  w-full flex-col p-4 bg-white">
      <section className="w-full py-4 px-2 flex flex-col gap-y-2 font-semibold ">
        <span className="w-full">Thème:</span>
        <p className="font-medium border py-4 px-3 border-blue-600 rounded-sm">
          {" "}
          {encadrant.Theme.nom}
        </p>
      </section>
      <section
        className={cn(
          "flex  w-full h-full gap-x-8 justify-between  p-6 bg-white",
          !encadrant.Binome?.etudiants.length && "justify-end"
        )}
      >
        {!!encadrant.Binome?.etudiants.length && (
          <div className="flex flex-col h-96 space-y-8 w-[45%] bg-[#FFFDE7] p-4 rounded-md ">
            <h1 className="text-center font-semibold text-[18px] text-purple-900">
              Binome
            </h1>

            <div className="flex-flex-col gap-y-4 h-full capitalize font-medium ">
              {!!encadrant.Binome &&
                encadrant.Binome.etudiants.map((i) => (
                  <div key={i.nom}>
                    <>
                      <p className="mb-2 text-slate-600">Nom</p>
                      <p className="mb-1">{i.nom}</p>
                      <Separator className="bg-neutral-200 w-full mb-5" />
                    </>
                    <>
                      <p className="mb-2 text-slate-600">prénom</p>
                      <p className="mb-1">{i.prenom}</p>
                      <Separator className="mb-5 bg-neutral-200 w-full " />
                    </>

                    <>
                      <p className="mb-2 text-slate-600">email</p>
                      <p>{i.email}</p>
                    </>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="flex flex-col h-96 space-y-8 w-[45%] bg-[#E1E3EE] p-4 rounded-md ">
          <h1 className="text-center font-semibold text-[18px] text-purple-900">
            {" "}
            Encadrant
          </h1>

          <div className="flex-flex-col gap-y-4 h-full capitalize font-medium">
            <div>
              <p className="mb-2 text-slate-600">Nom</p>
              <p className="mb-1">{encadrant.encadrent?.nom}</p>
              <Separator className="bg-neutral-300 w-full mb-5" />
            </div>
            <>
              <p className="mb-2 text-slate-600">prénom</p>
              <p className="mb-1">{encadrant.encadrent?.prenom}</p>
              <Separator className="mb-5 bg-neutral-300 w-full" />
            </>

            <>
              <p className="mb-2 text-slate-600">email</p>
              <p>{encadrant.encadrent?.email}</p>
            </>
          </div>
        </div>
      </section>
    </section>
  );
};
