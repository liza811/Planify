import { SalleItem } from "./salle-item";

interface ListeSallesInterface {
  salles:
    | {
        bloc: number;
        numero: number;
        id: string;
      }[]
    | null;
}
export const ListeSalles = ({ salles }: ListeSallesInterface) => {
  return (
    <main className="flex flex-col w-full border rounded-s-sm  gap-y-4 items-center ">
      <div className="flex items-center justify-between border-b bg-sec py-4 px-6 w-full">
        <div className="w-1/4 text-slate-500">Column 1</div>
        <div className="w-1/4 text-slate-500">Column 2</div>
        <div className="w-1/4 text-slate-500">Column 3</div>
        <div className="w-1/4 text-slate-500"> Actions</div>
      </div>

      <div className="flex flex-col  items-center justify-between border-b  py-2 px-6 w-full bg-white">
        {salles?.map((salle, _index) => {
          return (
            <SalleItem
              key={salle.id}
              bloc={salle.bloc}
              numero={salle.numero}
              index={_index + 1}
              id={salle.id}
            />
          );
        })}
      </div>
    </main>
  );
};
