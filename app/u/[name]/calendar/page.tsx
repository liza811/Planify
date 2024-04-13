import { getSalles } from "@/lib/salle";
import { Results } from "./calendar";
import { getJury } from "@/lib/jury";
import { DatesIndisponibles } from "../page";
import { getEnseignantsWithIndisponibilites } from "@/lib/indisponibilite";
import { format, isValid, parse } from "date-fns";

const CalendarPage = async () => {
  const enseignantsWithIndisponibilites: DatesIndisponibles | any =
    await getEnseignantsWithIndisponibilites();

  // {"to":"03/04/2024","from":"03/04/2024"}
  const indisponibilitess: IndisponibiliteJury[] =
    enseignantsWithIndisponibilites.map(
      (enseignant: { datesIndisponibles: DatesIndisponibles; id: any }) => {
        const dates = [];
        const indispo = enseignant.datesIndisponibles;
        if (indispo) {
          const fromDate = parse(indispo.from, "dd/MM/yyyy", new Date());
          const toDate = parse(indispo.to, "dd/MM/yyyy", new Date());

          if (isValid(fromDate) && isValid(toDate)) {
            for (
              let currDate = fromDate;
              currDate <= toDate;
              currDate.setDate(currDate.getDate() + 1)
            ) {
              dates.push(format(currDate, "yyyy-MM-dd"));
            }
          } else {
            console.error(
              `Invalid date format: from: ${indispo.from}, to: ${indispo.to}`
            );
          }
        }
        return {
          idJury: enseignant.id,
          datesIndisponibles: dates,
        };
      }
    );
  const salless = await getSalles();
  const binomesWithJury = await getJury();
  const binomess: Binome[] = binomesWithJury?.map((binome) => {
    const jury = [];

    // President ID (if present)
    if (binome.presidentId) {
      jury.push(binome.presidentId);
    }

    // Examiner IDs
    binome.Jury.map((j) =>
      j.examinateurs.examinateurs.forEach((examiner) => {
        jury.push(examiner.id);
      })
    );
    return {
      idBinome: binome.id,
      jury,
    };
  });

  const formattedSalles: Salle[] = salless.map((salle) => ({
    nom: salle.id,
    indisponibilite: [],
  }));

  const dateDebut = "2024-04-11";
  const dateFin = "2024-04-17";
  const heureDebut = "08:00";
  const heureFin = "16:00";
  const duree = 2;
  const resultat = Plan(
    binomess,
    formattedSalles,
    indisponibilitess,
    dateDebut,
    dateFin,
    2
  );
  console.log(resultat);
  return (
    <div>
      {resultat ? (
        <Results resultat={resultat.resultats} />
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  );
};

export default CalendarPage;
export interface IndisponibiliteJury {
  idJury: string;
  datesIndisponibles: string[]; // Liste de dates et heures au format ISO (ex. "2024-03-09T10:00:00")
}

function getDatesEtHorairesDisponibles(
  jurys: IndisponibiliteJury[],
  dateDebut: string,
  dateFin: string
): string[] {
  const datesEtHorairesDisponibles: string[] = [];

  // Convertir les dates de début et de fin en objets Date
  const startDate = new Date(dateDebut);
  const endDate = new Date(dateFin);

  // Parcourir chaque date entre la date de deb et la date de fin

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const formattedDate = startDate.toLocaleDateString("fr-FR", {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    if (formattedDate.startsWith("ven")) {
      // si vendredi passer a la date suivante
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      let isAvailablee: boolean = true;
      const currentDateTime = currentDate.toISOString(); // Convertir en format ISO
      const [date, heure] = currentDateTime.split("T");
      const horaireS = [
        `${date}T08:00:00`,
        `${date}T10:00:00`,
        `${date}T12:00:00`,
        `${date}T14:00:00`,
      ];
      //const horaireS = heurePermis(heureDebut, heureFin, duree, date);
      datesEtHorairesDisponibles.push(...horaireS);
      for (let i = 0; i < jurys.length; i++) {
        if (jurys[i].datesIndisponibles.includes(date)) {
          currentDate.setDate(currentDate.getDate() + 1);
          for (let j = 0; j < horaireS.length; j++) {
            const index = datesEtHorairesDisponibles.indexOf(horaireS[j]);

            datesEtHorairesDisponibles.splice(index, 1);
          }
          isAvailablee = false;
          break;
        } else {
          for (let hor = 0; hor < horaireS.length; hor++) {
            if (
              jurys[i].datesIndisponibles.some((date) => date === horaireS[hor])
            ) {
              const index = datesEtHorairesDisponibles.indexOf(horaireS[hor]);
              if (index !== -1) {
                datesEtHorairesDisponibles.splice(index, 1);
              }
            }
          }
          isAvailablee = true;
        }
      }

      if (isAvailablee) {
        // Passer à la date suivante

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }
  //console.log(datesEtHorairesDisponibles);
  return datesEtHorairesDisponibles;
}

function heurePermis(
  heureDebut: string,
  heureFin: string,
  duree: number,
  date: string
): string[] {
  const horaire: string[] = [];

  for (let i = heureDebut; i <= heureFin; i += duree) {
    // Ajouter l'heure au tableau
    horaire.push(`${date}T${i.toString().padStart(2, "0")}:00.000Z`);
    console.log(`${date}T${i.toString().padStart(2, "0")}:00.000Z`);
  }

  return horaire;
}

// const datesEtHorairesDisponibles = getDatesEtHorairesDisponibles(
//   indisponibilites,
//   dateDebut,
//   dateFin
// );
//console.log("Dates et horaires disponibles :", datesEtHorairesDisponibles);

type ResultatPlanification = {
  resultats: (Soutenance | string)[];
};

type Binome = {
  idBinome: string;
  jury: string[];
};

type Soutenance = {
  nomBinome: string;
  jury: string[];
  salle?: string;
  date?: DateStr;
  heure?: string;
};
type DateStr = string;
interface Salle {
  nom: string;
  indisponibilite?: DateStr[];
}

//const resultat = Plan(binomes, salles, indisponibilites, dateDebut, dateFin, 2);

//console.log(resultat.resultats);
function Plan(
  binomes: Binome[],
  salles: Salle[],
  indisponibilites: IndisponibiliteJury[],
  dateDebut: DateStr,
  dateFin: DateStr,
  dureeSoutenance: number
): ResultatPlanification {
  const resultats: (Soutenance | string)[] = [];
  let salleChoisie: [string, string] | null;

  let indisponibilitesJury: IndisponibiliteJury[] = indisponibilites;
  let indisponibilitesSalles: Salle[] = salles;

  for (const binome of binomes) {
    const juryBinome = indisponibilitesJury.filter((element) =>
      binome.jury.includes(element.idJury)
    );
    //console.log(indisponibilitesJury);
    const plagesHorairesDisponibles = getDatesEtHorairesDisponibles(
      juryBinome,
      dateDebut,
      dateFin
    );
    console.log(`iteration${binome} avec ${plagesHorairesDisponibles}`);
    if (plagesHorairesDisponibles.length > 0) {
      salleChoisie = trouverSalleDisponible(
        indisponibilitesSalles,
        plagesHorairesDisponibles
      );
      //  console.log(salleChoisie);
      if (salleChoisie?.length) {
        const dateObj = new Date(salleChoisie[1]);
        const date = dateObj.toISOString().split("T")[0]; // Extraction de la partie date
        const heures = dateObj.getHours().toString().padStart(2, "0"); // Ajouter des zéros à gauche si nécessaire
        const minutes = dateObj.getMinutes().toString().padStart(2, "0"); // Ajouter des zéros à gauche si nécessaire
        const heurePart = `${heures}:${minutes}`; // Construction de la partie heure
        resultats.push({
          nomBinome: binome.idBinome,
          jury: binome.jury,
          salle: salleChoisie[0],
          date: date,
          heure: heurePart,
        });
        //update
        indisponibilitesJury = mettreAjourDispoJury(
          indisponibilitesJury,
          binome.jury,
          salleChoisie[1]
        );
        indisponibilitesSalles = metterAJourSalle(
          indisponibilitesSalles,
          salleChoisie[0],
          salleChoisie[1]
        );
        //console.log(indisponibilitesJury);
      } else {
        resultats.push(
          `${binome.idBinome} :Session rattrapage, aucune salle disponnible`
        );
      }
    } else {
      resultats.push(
        `${binome.idBinome} :Session rattrapage, aucune date commune disponnible pour les jury`
      );
    }

    //console.log(plagesHorairesDisponibles);
  }

  return { resultats };
}

function trouverPlageDisponible(
  salle: Salle,
  plagesHoraires: string[]
): string | null {
  if (salle.indisponibilite && salle.indisponibilite.length > 0) {
    for (const plageHoraire of plagesHoraires) {
      if (!salle.indisponibilite.includes(plageHoraire)) {
        return plageHoraire;
      }
    }
  } else {
    // Si salle.indisponibilite est vide retourner  la 1ere plage horaire disponible
    return plagesHoraires[0];
  }
  return null;
}

function melangerListeSalles(salles: Salle[]): Salle[] {
  return [...salles].sort(() => Math.random() - 0.5);
}

function trouverSalleDisponible(
  salles: Salle[],
  plagesHoraires: string[]
): [string, string] | null {
  const sallesMelangees = melangerListeSalles(salles);
  const plagesHorairesSansMillis: string[] = plagesHoraires.map(
    (plage) => plage.split(".")[0]
  );
  //console.log(plagesHorairesSansMillis);

  for (const salle of sallesMelangees) {
    const plageDisponible = trouverPlageDisponible(
      salle,
      plagesHorairesSansMillis
    );
    if (plageDisponible !== null) {
      return [salle.nom, plageDisponible];
    }
  }
  return null;
}

// function mettreAjourDispoJury(
//   indisponibilites: IndisponibiliteJury[],
//   jurys: string[],
//   date: string
// ) {
//   indisponibilites.forEach((jury) => {
//     if (jurys.includes(jury.idJury)) {
//       jury.datesIndisponibles.push(date);
//     }
//   });
//   // console.log(indisponibilites);
//   return indisponibilites; // Optionally return the updated list
// }

function mettreAjourDispoJury(
  indisponibilites: IndisponibiliteJury[],
  jurys: string[],
  date: string
): IndisponibiliteJury[] {
  // Itérer sur chaque jury
  jurys.forEach((jury) => {
    // Trouver l'indice de l'indisponibilité du jury correspondant
    const index = indisponibilites.findIndex(
      (indisponibilite) => indisponibilite.idJury === jury
    );

    // Si l'indisponibilité du jury est trouvée
    if (index !== -1) {
      // Vérifier si la date existe déjà
      const dateExisteDeja = indisponibilites[index].datesIndisponibles.some(
        (dateIndisponible) => dateIndisponible === date
      );

      // Si la date n'existe pas deja l'ajouter
      if (!dateExisteDeja) {
        indisponibilites[index].datesIndisponibles.push(date);
      }
    }
  });

  // console.log(indisponibilites);
  return indisponibilites;
}

function metterAJourSalle(salles: Salle[], nomSalle: string, date: string) {
  const salle = salles.find((salle) => salle.nom === nomSalle);

  if (!salle) {
    throw new Error(`La salle avec le nom ${nomSalle} n'existe pas.`);
  }

  const dateExisteDeja = salle.indisponibilite!.some(
    (dateIndisponible) => dateIndisponible === date
  );

  if (!dateExisteDeja) {
    salle.indisponibilite!.push(date);
  }

  return salles;
}
