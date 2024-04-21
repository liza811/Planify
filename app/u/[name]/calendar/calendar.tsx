import { Soutenance } from "./page";

type DateStr = string;
export const Results = ({
  resultat,
}: {
  resultat: (string | Soutenance)[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {resultat.map((item) => (
        <div
          key={item.toString() || "message"}
          className={`p-4 border rounded-md ${
            typeof item === "string"
              ? "bg-gray-200"
              : item.salle && item.date
              ? "bg-green-200"
              : "bg-red-200"
          }`}
        >
          {typeof item === "string" ? (
            <p className="text-red-500">{item}</p>
          ) : (
            <>
              <h3 className="font-bold">{item.nomBinome}</h3>
              <p>Encadrant: {item.encadrant}</p>
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
