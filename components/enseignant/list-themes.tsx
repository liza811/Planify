import { spec } from "node:test/reporters";
import { ThemeItem } from "./theme-item";

interface ThemeWithSpecialities {
  specialites: { nom: string }[] | null;
  themes: {
    id: string;
    nom: string;
    createdAt: Date;
    themeSpecialites: {
      specialite: {
        nom: string;
      };
    }[];
  }[];
}

export const ListThemes = ({ themes, specialites }: ThemeWithSpecialities) => {
  return (
    <div>
      {!!themes && (
        <div className="grid grid-cols-1  gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {themes.map((theme) => (
            <ThemeItem
              key={theme.id}
              nom={theme.nom}
              id={theme.id}
              createdAt={theme.createdAt}
              specialite={theme.themeSpecialites}
              allSpecialites={specialites}
            />
          ))}
        </div>
      )}
    </div>
  );
};
