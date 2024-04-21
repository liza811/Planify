import { getSalles } from "@/lib/salle";
import { Results } from "./calendar";
import { getEnsWithGrade, getJury } from "@/lib/jury";
import { DatesIndisponibles } from "../page";
import { getEnseignantsWithIndisponibilites } from "@/lib/indisponibilite";
import { format, isValid, parse } from "date-fns";
type DateStr = string;
export type Soutenance = {
  nomBinome: string;
  encadrant: string;
  salle?: string;
  date?: DateStr;
  heure?: string;
  president?: String;
  examinateurs?: String[];
};
export interface Salle {
  nom: string;
  indisponibilite?: DateStr[];
}
interface IndisponibiliteJury {
  idJury: string;
  datesIndisponibles: string[];
}

export type ResultatPlanification = {
  resultats: (Soutenance | string)[];
};

type Binome = {
  idBinome: string;
  theme?: string[];

  encadrant: string;
};
type Enseignant = {
  nom: string;
  grade: string;
  specialite: string;
  poids: number;
};
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
  const ensWithGradeWithSpecialite = await getEnsWithGrade();
  // const ensWithGradeWithSpecialite: {
  //   specialite: {
  //     nom: string;
  //   };
  //   id: string;
  //   grade: string;
  // }[] = [
  //
  // ];

  const enseignants: Enseignant[] = ensWithGradeWithSpecialite.map((ens) => ({
    nom: ens.id,
    grade: ens.grade,
    specialite: ens.specialite.nom,
    poids: 0,
  }));

  const binomesWithJury = await getJury();
  const binomess: Binome[] = binomesWithJury?.map((binome) => {
    const theme: string[] = [];

    binome.Affectation?.Theme.themeSpecialites.map((j) => {
      theme.push(j.specialite.nom);
    });
    return {
      idBinome: binome.id,
      theme,
      encadrant: binome.Affectation?.encadrent?.id!,
    };
  });

  const formattedSalles: Salle[] = salless.map((salle) => ({
    nom: salle.id,
    indisponibilite: [],
  }));

  const dateDebut = "2024-04-20";
  const dateFin = "2024-04-30";
  const heureDebut = "08:00";
  const heureFin = "16:00";
  const duree = 2;
  const resultat = Plan(
    binomess,
    enseignants,
    formattedSalles,
    indisponibilitess,
    dateDebut,
    dateFin,
    2
  );

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

//################# ALOGORITHME ##########################

function getDatesEtHorairesDisponibles(
  jurys: IndisponibiliteJury[],
  dateDebut: string,
  dateFin: string
): string[] {
  const datesEtHorairesDisponibles: string[] = [];

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
      const currentDateTime = currentDate.toISOString();
      const [date, heure] = currentDateTime.split("T");
      const horaireS = [
        `${date}T08:00:00`,
        `${date}T10:00:00`,
        `${date}T12:00:00`,
        `${date}T14:00:00`,
      ];
      // const horaireS = heurePermis(date, heureDebut, heureFin, duree, "00:15");
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

//console.log("Dates et horaires disponibles :", datesEtHorairesDisponibles);

function Plan(
  binomes: Binome[],
  enseignantss: Enseignant[],
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
    const enseignants = shuffleTeachers(enseignantss);
    // Affecter le président
    const enseignantWithoutEncadrant = enseignants.filter(
      (ens) => ens.nom !== binome.encadrant
    );
    let president = affecterEnseignantAvecPoidsLePlusFaible(
      filtrerEnseignants("PR", binome.theme!, enseignantWithoutEncadrant),
      binome.theme!
    );
    if (!president) {
      president = affecterEnseignantAvecPoidsLePlusFaible(
        filtrerEnseignants("MCA", binome.theme!, enseignants),
        binome.theme!
      );
    }
    ///////////////////////////////////////////////////////////////////////
    //affecter examinateurs
    const examinateurs: string[] = [];
    let enseignantWithoutEncadrantAndPresident = enseignants.filter(
      (ens) => ens.nom !== binome.encadrant && ens.nom !== president?.nom
    );
    for (let i = 0; i < 2; i++) {
      const examinateur = affecterEnseignantAvecPoidsLePlusFaible(
        filtrerExaminateurs(
          binome.theme!,
          enseignantWithoutEncadrantAndPresident
        ),
        binome.theme!
      );

      if (examinateur) {
        if (examinateur.nom !== binome.encadrant) {
          examinateurs.push(examinateur.nom);
          enseignantWithoutEncadrantAndPresident =
            enseignantWithoutEncadrantAndPresident.filter(
              (ens) => ens.nom !== examinateur.nom
            );
          examinateur.poids++;
        }
      }
    }
    const tousLesJurys = [binome.encadrant, president?.nom, ...examinateurs];

    const juryBinome = indisponibilitesJury.filter((element) =>
      tousLesJurys.includes(element.idJury)
    );
    const plagesHorairesDisponibles = getDatesEtHorairesDisponibles(
      juryBinome,
      dateDebut,
      dateFin
    );
    // console.log(`iteration${binome} avec ${plagesHorairesDisponibles}`);
    if (plagesHorairesDisponibles.length > 0) {
      salleChoisie = trouverSalleDisponible(
        indisponibilitesSalles,
        plagesHorairesDisponibles
      );
      //  console.log(salleChoisie);
      if (salleChoisie?.length) {
        const dateObj = new Date(salleChoisie[1]);
        const date = dateObj.toISOString().split("T")[0];
        const heures = dateObj.getHours().toString().padStart(2, "0");
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        const heurePart = `${heures}:${minutes}`;
        resultats.push({
          nomBinome: binome.idBinome,
          encadrant: binome.encadrant,
          president: president?.nom,
          examinateurs: examinateurs,
          salle: salleChoisie[0],
          date: date,
          heure: heurePart,
        });
        //update
        indisponibilitesJury = mettreAjourDispoJury(
          indisponibilitesJury,
          //@ts-ignore
          tousLesJurys,
          salleChoisie[1]
        );
        indisponibilitesSalles = metterAJourSalle(
          indisponibilitesSalles,
          salleChoisie[0],
          salleChoisie[1]
        );
        //console.log(indisponibilitesJury);
      } else {
        const dateObj = new Date(plagesHorairesDisponibles[0]);
        const date = dateObj.toISOString().split("T")[0];
        const heures = dateObj.getHours().toString().padStart(2, "0");
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        const heurePart = `${heures}:${minutes}`;
        resultats.push(`${binome.idBinome} : aucune salle disponible`);
        resultats.push({
          nomBinome: binome.idBinome,
          encadrant: binome.encadrant,
          president: president?.nom,
          examinateurs: examinateurs,

          date: date,
        });
        //update
        indisponibilitesJury = mettreAjourDispoJury(
          indisponibilitesJury,
          //@ts-ignore
          tousLesJurys,
          plagesHorairesDisponibles[0]
        );
      }
    } else {
      resultats.push(
        `${binome.idBinome} :Session rattrapage, aucune date commune disponible pour les encadrant`
      );
      resultats.push({
        nomBinome: binome.idBinome,
        encadrant: binome.encadrant,
        president: president?.nom,
        examinateurs: examinateurs,
      });
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

function mettreAjourDispoJury(
  indisponibilites: IndisponibiliteJury[],
  jurys: string[],
  date: string
): IndisponibiliteJury[] {
  if (!jurys) {
    return indisponibilites;
  }
  // Itérer sur chaque membre
  jurys?.forEach((encadrant) => {
    // Trouver l'indice de l'indisponibilité de l encadrant correspondant
    const index = indisponibilites.findIndex(
      (indisponibilite) => indisponibilite.idJury === encadrant
    );

    // Si l'indisponibilité de l encadrant est trouvée
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

function filtrerExaminateurs(
  specialites: string[],
  enseignants: Enseignant[]
): Enseignant[] {
  return enseignants.filter((enseignant) =>
    specialites.some((specialite) => enseignant.specialite.includes(specialite))
  );
}
function filtrerEnseignants(
  grade: string,
  specialites: string[],
  enseignants: Enseignant[]
): Enseignant[] {
  return enseignants.filter(
    (enseignant) =>
      enseignant.grade === grade &&
      specialites.some((specialite) =>
        enseignant.specialite.includes(specialite)
      )
  );
}
function affecterEnseignantAvecPoidsLePlusFaible(
  enseignants: Enseignant[],
  specialites: string[]
): Enseignant | undefined {
  if (enseignants.length === 0) {
    return undefined;
  }

  const sortedEnseignants = enseignants.sort((a, b) => a.poids - b.poids);
  return sortedEnseignants[0];
}

function shuffleTeachers(enseignants: Enseignant[]) {
  const shuffledEnseignants = [...enseignants];

  for (let i = shuffledEnseignants.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledEnseignants[i], shuffledEnseignants[randomIndex]] = [
      shuffledEnseignants[randomIndex],
      shuffledEnseignants[i],
    ];
  }

  return shuffledEnseignants;
}

// function heurePermis(
//   date,
//   startTime,
//   endTime,
//   duration: string,
//   pose
// ): string[] {
//   const timeSlots: string[] = [];
//   const startDateObj = new Date(date);

//   // Convert duration and pose to minutes (handling various formats)
//   const durationParts = duration.split(":");
//   const durationInMinutes =
//     durationParts.length === 2
//       ? parseInt(durationParts[0]) * 60 + parseInt(durationParts[1])
//       : typeof duration === "number"
//       ? duration * 60
//       : parseInt(duration) * 60;

//   const poseParts = pose.split(":");
//   const poseInMinutes =
//     poseParts.length === 2
//       ? parseInt(poseParts[0]) * 60 + parseInt(poseParts[1])
//       : typeof pose === "number"
//       ? pose * 60
//       : parseInt(pose) * 60;

//   while (date <= endTime) {
//     const timeSlot =
//       date +
//       "T" +
//       date.toLocaleTimeString("fr-FR", {
//         hour: "2-digit",
//         minute: "2-digit",
//       }); // Format time slot
//     timeSlots.push(timeSlot);
//     console.log(timeSlot);

//     // date.setMinutes(date.getMinutes() + durationInMinutes + poseInMinutes); // Add duration and pose (in minutes) to current time
//   }

//   console.log(timeSlots);
//   return timeSlots;
// }
