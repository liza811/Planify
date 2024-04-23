import { Soutenance } from "./page";

type DateStr = string;
export const Results = ({
  resultat,
}: {
  resultat: (string | Soutenance)[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 w-fit">
      {resultat.map((item) => (
        <div
          key={item.toString() || "message"}
          className={`p-4 border rounded-md ${
            typeof item === "string"
              ? "bg-gray-200"
              : item.salle && item.date
              ? "bg-[#FFFDE7]"
              : "bg-red-200"
          }`}
        >
          {typeof item === "string" ? (
            <p className="text-red-500">{item}</p>
          ) : (
            <>
              <h3 className="font-bold text-primary_blue">
                Binome: {item.idBinome}
              </h3>
              <p className="text-sm">Encadrant: {item.encadrant}</p>
              <p>President: {item.president}</p>
              <p>Examinateurs: {item.examinateurs?.join(",")}</p>
              <p>
                {item.salle && item.date ? (
                  <>
                    Salle: {item.salle}
                    <br />
                    Date: {item.date}
                    <br />
                    Heure: {item.heure}
                  </>
                ) : (
                  <p>Salle ou date non disponible</p>
                )}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
