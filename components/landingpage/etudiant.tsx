"use client";

import Image from "next/image";

import Section from "./section";
import { ScrollParallax } from "react-just-parallax";
import {
  BoxSelectIcon,
  FileUpIcon,
  MessageSquareIcon,
  PaletteIcon,
} from "lucide-react";

export const Etudiant = () => {
  return (
    <Section
      className="pt-12 px-0 w-full relative "
      crosses
      crossesOffset="lg:translate-y-[0.25rem]"
      customPaddings
      id="hero"
    >
      <section
        className="
     px-4
     
      flex
      justify-center
   gap-x-2
      max-w-full 
      
      overflow-hidden
    "
      >
        <div className=" lg:ml-14  ">
          <Image
            alt="workflow"
            src={"/etud-1.png"}
            width={70}
            height={200}
            className="-mt-1.5"
          />
          <Image
            alt="workflow"
            src={"/etud2.png"}
            width={73}
            className="-mt-4 ml-1.5"
            height={200}
          />
          <Image
            alt="workflow"
            src={"/etud3.png"}
            width={53}
            className="-mt-5 ml-7"
            height={100}
          />
        </div>
        <div className=" relative flex flex-col justify-start  lg:w-[1150px]">
          <div
            className="w-[40%]
        blur-[150px]
        rounded-full
        h-28
        absolute
        bg-[#396ED1]/60
        -z-10
        top-[470px]
        left-[200px]
      "
          />

          <div className="bg-custom-gradient p-[1px] w-fit  h-fit  rounded-[0.5rem] flex items-center justify-center mt-1 ml-3">
            <div className="flex text-[#767BF8]/80 bg-[#01265c] rounded-[0.5rem] py-[.38rem] px-[.75rem]  items-center w-fit gap-x-2 z-30">
              <BoxSelectIcon className="size-5" />
              <p className="text-[13px]  font-semibold">Pour les Etudiants</p>
            </div>
          </div>
          <h1
            className=" text-left 
          text-3xl
          sm:text-5xl
         w-full
         mt-7
         ml-3
         text-neutral-200
          font-semibold
        "
          >
            Simplifiez votre parcours de graduation.
          </h1>
          <p
            className="  w-[90%] text-[1.5rem] mt-6 ml-3 text-slate-400
          
          "
          >
            Trouvez le thème idéal, restez informé en temps réel, et suivez
            chaque étape de votre progression directement en ligne.
          </p>
          <p
            className=" w-full text-[1rem] mt-[88px] mb-10 text-[#2061da] max-w-[400px]  ml-3 font-bold
          pl-2
          "
          >
            Glissez simplement les thèmes de votre choix dans l&apos;espace
            dédié, et validez-les en seulement quelques clics.
          </p>
          <div className="w-full flex flex-col">
            <Image
              src={"/main-etud.png"}
              alt="Banner"
              className="scale-[1.2]  pl-20 mt-3"
              width={1300}
              height={1000}
            />
            <div className="flex justify-around gap-20 -ml-1 -mt-20 z-40 pr-10 w-full">
              <div className="flex flex-col gap-y-3">
                <span className="flex gap-x-2 items-center">
                  <FileUpIcon className="size-6 text-[#2061da]" />
                  <p className="text-[1rem] text-neutral-50 font-semibold">
                    Exportation PDF
                  </p>
                </span>
                <p className="text-[0.800rem] text-white opacity-80 font-[400] pl-2 ">
                  Téléchargez votre planning au format PDF et accédez-y hors
                  ligne à tout moment. Votre planning, toujours à portée de
                  main.
                </p>
              </div>
              <div className="flex flex-col gap-y-3">
                <span className="flex gap-x-2 items-center">
                  <MessageSquareIcon className="size-6 text-[#2061da]" />
                  <p className="text-[1rem] text-neutral-50 font-semibold ">
                    Collaboration en Temps Réel
                  </p>
                </span>
                <p className="text-[0.800rem] text-white opacity-80 font-[400] pl-2">
                  Les membres du binôme peuvent collaborer et choisir leurs
                  thèmes en temps réel, avec partage d&apos;écran intégré.
                </p>
              </div>

              <div className="flex flex-col gap-y-3">
                <span className="flex gap-x-2 items-center">
                  <PaletteIcon className="size-6 text-[#2061da]" />
                  <p className="text-[1rem] text-neutral-50 font-semibold">
                    Vue Globale des Thèmes
                  </p>
                </span>
                <p className="text-[0.875rem] text-white opacity-80 font-[400] pl-2">
                  Consultez l&apos;ensemble des thèmes proposés avec toutes les
                  informations détaillées, y compris les encadrants.
                </p>
              </div>
            </div>
          </div>
          <ScrollParallax isAbsolutelyPositioned zIndex={40}>
            <ul className="hidden absolute -left-28 bottom-96 px-1  bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex  z-50">
              <li className="px-4 py-5 z-50 flex items-center  ">
                <Image
                  className="w-5 h-5 mr-4"
                  width={20}
                  height={20}
                  src={"/check (2).svg"}
                  alt="Loading"
                />
                Validez vos choix...
              </li>
            </ul>
          </ScrollParallax>
          <div
            className="w-[40%]
        blur-[200px]
        rounded-full
        h-24
        absolute
         bg-[#396ED1]/60
        -z-10
        top-[700px]
        left-[500px]
      "
          />
        </div>
      </section>
    </Section>
  );
};
