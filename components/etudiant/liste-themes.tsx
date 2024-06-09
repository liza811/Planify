import { ThemeItem } from "./theme-item";

type Theme = {
  id: string;
  nom: string;
  proposerId: string;
  createdAt: Date;
  themeSpecialites: ThemeSpecialite[];
  proposePar: Enseignant | null;
};

type ThemeSpecialite = {
  themeId: string;
  specialiteId: string;
  specialite: {
    nom: string;
  };
};

type Enseignant = {
  nom: string;
  prenom: string;
};

export const ListThemes = ({ themes }: { themes: Theme[] }) => {
  return (
    <div>
      {!!themes && (
        <div className="grid grid-cols-1  gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {themes.map((theme) => (
            <ThemeItem
              key={theme.id}
              nom={theme.nom}
              id={theme.id}
              specialite={theme.themeSpecialites}
              proposePar={
                `${theme.proposePar?.nom} ${theme.proposePar?.prenom}` || ""
              }
              createdAt={theme.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};
