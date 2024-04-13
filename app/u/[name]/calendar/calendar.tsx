type ResultatPlanification = {
  resultats: (Soutenance | string)[];
};

type Soutenance = {
  nomBinome: string;
  jury: string[];
  salle?: string;
  date?: DateStr;
  heure?: string;
};
type DateStr = string;
export const Results = ({ resultat }: { resultat: Soutenance[] | any }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {resultat.map((item: any) => (
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
              <p>Jury: {item.jury.join(", ")}</p>
              <p>
                {item.salle && item.date ? (
                  <>
                    Salle: {item.salle} -
                    <br />
                    Date: {item.date} Heure: {item.heure}
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
