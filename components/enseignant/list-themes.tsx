import { ThemeItem } from "./theme-item";

interface ThemeWithSpecialities {
  specialites: { nom: string }[] | null;
  domaine: { nom: string; id: string }[] | null;
  themes: {
    id: string;
    nom: string;
    createdAt: Date;
    Domaine: {
      nom: string;
      id: string;
    };
    themeSpecialites: {
      specialite: {
        nom: string;
      };
    }[];
  }[];
}

export const ListThemes = ({
  themes,
  specialites,
  domaine,
}: ThemeWithSpecialities) => {
  return (
    <div>
      {!!themes && (
        <div className="grid grid-cols-1  gap-4 gap-y-6 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {themes.map((theme) => (
            <ThemeItem
              key={theme.id}
              nom={theme.nom}
              id={theme.id}
              createdAt={theme.createdAt}
              specialite={theme.themeSpecialites}
              allSpecialites={specialites}
              domaine={theme.Domaine}
              allDomaines={domaine}
            />
          ))}
        </div>
      )}
    </div>
  );
};
