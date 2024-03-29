import { Info } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger
        asChild
        className="text-start flex justify-start p-0 w-full"
      >
        <Button
          variant="link"
          name="info"
          className="text-start text-secondary-foreground"
        >
          <Info className="h-5 w-5 text-sky-900 mr-2" />
          Survolez pour plus d &apos;informations
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between ">
          <Avatar>
            <AvatarImage src="/xls.png" className="w-7 h-7" />
            <AvatarFallback>XLS</AvatarFallback>
          </Avatar>
          <div className="space-y-1 p-0">
            <h4 className="text-sm font-semibold"> champs requis</h4>
            <p className="text-[12px]">
              Votre fichier doit contenir tous les champs suivant
            </p>
            <div className="grid grid-cols-3  flex-col justify-start pt-2 opacity-70">
              <span className="text-xs  space-x-2 text-foreground capitalize">
                Nom
              </span>
              <span className="text-xs text-foreground capitalize">Prenom</span>
              <span className="text-xs  space-x-2 text-foreground capitalize">
                Email
              </span>
              <span className="text-xs text-foreground capitalize">
                Matricule
              </span>
              <span className="text-xs text-foreground capitalize">Grade</span>
              <span className="text-xs text-foreground capitalize">
                Specialité
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
