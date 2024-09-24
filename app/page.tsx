import Image from "next/image";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"],
});
import {
  BoxSelectIcon,
  DoorOpenIcon,
  PaletteIcon,
  SettingsIcon,
  UserCogIcon,
  UserIcon,
} from "lucide-react";
import Header from "@/components/landingpage/header";
import { cn } from "@/lib/utils";
import ButtonGradient from "@/components/landingpage/buttonGradient";
import { Landing } from "@/components/landingpage/landing";
import Section from "@/components/landingpage/section";
import { Etudiant } from "@/components/landingpage/etudiant";
import { BottomLine } from "@/components/landingpage/hero";
import Buttonn from "@/components/landingpage/button";
import { Gradient } from "@/components/landingpage/gradient";
import { LeftCurve, RightCurve } from "@/components/landingpage/design";

const HomePage = () => {
  return (
    <main
      className={cn(
        "overflow-hidden bg-[hsl(249,100%,3.9%)] text-[hsl(248,100%,88%)]",
        inter.className
      )}
    >
      <Header />
      <ButtonGradient />
      <Landing />

      <Section id="hero" className="  flex justify-center py-0 -mt-4">
        <article
          className="rounded-full
   
          p-[1px]
          text-[16px]
          bg-gradient-to-r
          from-brand-primaryBlue
          to-brand-primaryPurple
        "
        >
          <div
            className="rounded-full 
            px-5
            py-1.5
            w-36
            bg-black"
          >
            {"✨Features"}
          </div>
        </article>
      </Section>
      <Etudiant />
      <Section
        className="pt-32 px-0 w-full relative "
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id={"#enseignants"}
      >
        <section
          className="
       px-4
       lg:px-8
        flex
        justify-center
     gap-x-2
        w-full 
        relative
      "
        >
          <div className=" lg:ml-16">
            <Image alt="workflow" src={"/ens.webp"} width={80} height={200} />
          </div>
          <div className="w-full relative flex flex-col justify-start px-2 lg:mr-10">
            <div
              className="w-[60%]
          blur-[150px]
          rounded-full
          h-28
          absolute
          bg-[#fb4b87]/60
          
          top-[400px]
          left-[340px]
        "
            />
            <div className="bg-custom-gradient2 p-[1px] w-fit  h-fit  rounded-[0.5rem] flex items-center justify-center mt-1 ml-3">
              <div className="flex text-[#fb4b87] bg-[#4a2230] rounded-[0.5rem] py-[.38rem] px-[.75rem]  items-center w-fit gap-x-2 z-30">
                <BoxSelectIcon className="size-5" />
                <p className="text-[13px]  font-semibold">
                  Pour les Enseignants
                </p>
              </div>
            </div>
            <h1
              className=" text-left 
            text-3xl
            sm:text-5xl
           w-full
           mt-5
           text-neutral-200
            font-semibold
          "
            >
              Conçu pour permettre aux enseignants d&apos;organiser leur espace.
            </h1>
            <p
              className="  w-full text-[1.5rem] mt-5  text-slate-400
            
            "
            >
              Simplifiez vos démarches administratives et facilitez la
              communication. Centralisez toutes les informations de soutenance
              pour une gestion efficace.
            </p>

            <div
              className="
            relative
         w-full
        "
            >
              <Image
                src={"/main-ens.png"}
                alt="Banner"
                width={1300}
                height={1000}
              />
              <div
                className="w-[40%]
          blur-[200px]
          rounded-full
          h-24
          absolute
          bg-[#fb4b87]/60
          
          top-[700px]
          left-[500px]
        "
              />
              <p
                className=" w-full text-[1rem] mt-3 text-[#fb4b87] max-w-[400px] mb-7 font-bold
            
            "
              >
                Plus besoin de se perdre dans les plannings. Accédez facilement
                à votre planning personnalisé pour suivre vos interventions.
              </p>
              <Image src={"/ens2.png"} alt="Banner" width={850} height={500} />
              <div
                className="bottom-0
            top-[95%]
        
            bg-gradient-to-t
            from-[hsl(249,100%,3.9%)]
            left-0
            right-0
            absolute
            z-10
          "
              ></div>
            </div>
          </div>
        </section>
      </Section>

      <Section
        crosses
        className=" py-32 pt-36 px-14 pr-[40px] w-full relative "
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <BottomLine classname="top-[5.25rem]" />
        <div className="container lg:flex">
          <div className="max-w-[25rem]">
            <h2 className="text-[1.75rem] text-white leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight mb-4 md:mb-8 font-medium">
              Génération Automatique des Plannings
            </h2>

            <ul className="max-w-[22rem] mb-10 md:mb-14 ">
              <li className="mb-3 py-3">
                <div className="flex items-center">
                  <Image
                    src={"/check (2).svg"}
                    width={24}
                    height={24}
                    alt="check"
                  />
                  <h6 className="body-2 ml-5 text-white">
                    Personnalisation Flexible
                  </h6>
                </div>

                <p className="font-light text-[0.875rem] leading-6 md:text-base mt-3 text-n-3">
                  Configurez vos plannings selon les besoins spécifiques de
                  votre département.
                </p>
              </li>
              <li className="mb-3 py-3">
                <div className="flex items-center">
                  <Image
                    src={"/check (2).svg"}
                    width={24}
                    height={24}
                    alt="check"
                  />
                  <h6 className=" body-2 ml-5 text-white">
                    Versions Multiples
                  </h6>
                </div>
              </li>
              <li className="mb-3 py-3">
                <div className="flex items-center">
                  <Image
                    src={"/check (2).svg"}
                    width={24}
                    height={24}
                    alt="check"
                  />
                  <h6 className="body-2 ml-5 text-white ">
                    Ajustements Faciles
                  </h6>
                </div>
              </li>
            </ul>

            <Buttonn href={"/login"} className={"px-7 text-n-1"}>
              Essayez maintenant
            </Buttonn>
          </div>

          <div className="lg:ml-auto xl:w-[38rem] mt-1">
            <p className="body-2 mb-8 text-n-3 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
              Réagissez et Ajustez les plannings en temps réel selon les
              changements ou imprévus, pour une gestion fluide et efficace.
            </p>

            <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
              <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
                <div className="w-[4rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                  <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                    {/* <Image
                      src={"/logo-part.png"}
                      width={25}
                      height={25}
                      className="-ml-1"
                      alt="brainwave"
                    /> */}
                  </div>
                </div>
              </div>
              {/* className="absolute inset-0 animate-spin-slow" */}
              <ul>
                <li
                  className={`absolute top-0 left-[140px] h-fit flex justify-center items-center ml-[.6rem] origin-bottom group transition-all`}
                  style={{ transform: `rotate(${6 * 60}deg)` }}
                >
                  <div
                    className={`relative flex justify-center items-center  rounded-xl border border-n-6 `}
                    style={{
                      transform: `rotate(-${6 * 60}deg)`,
                    }}
                  >
                    <UserIcon size={50} className="px-2" color="#79FFF7" />
                  </div>
                  <Image
                    className="m-auto   -mt-12 opacity-0 group-hover:opacity-100 transition-opacity "
                    width={130}
                    height={150}
                    alt={"k"}
                    src={"/ensIcon4.png"}
                  />
                </li>
                <li
                  className={`absolute top-5 left-[160px] h-fit ml-[3.59rem] origin-bottom group transition-all`}
                  style={{ transform: `rotate(${4 * 45}deg)` }}
                >
                  <div
                    className={`relative flex justify-center items-center w-fit rounded-xl border border-n-6 `}
                    style={{
                      transform: `rotate(-${4 * 45}deg)`,
                    }}
                  >
                    <UserCogIcon size={50} className="px-2" color="#FF98E2" />
                  </div>
                  <Image
                    className="relative -mt-8 top-5 -left-32 opacity-0 group-hover:opacity-100 -rotate-[182deg] transition-opacity "
                    width={130}
                    height={150}
                    alt={"k"}
                    src={"/etudIcon.png"}
                  />
                </li>
                <li
                  className={`absolute  left-[150px] h-1/2 group origin-bottom`}
                  style={{ transform: `rotate(${3 * 56}deg)` }}
                >
                  <Image
                    className="m-auto relative -left-[135px] -mt-8 top-20  opacity-0 group-hover:opacity-100 transition-opacity rotate-[189deg] "
                    width={130}
                    height={150}
                    alt={"k"}
                    src={"/localIcon3.png"}
                  />
                  <div
                    className={`relative   w-fit rounded-xl border border-n-6 `}
                    style={{
                      transform: `rotate(-${3 * 56}deg)`,
                    }}
                  >
                    <DoorOpenIcon size={50} className="px-2" color="#FFC876" />
                  </div>
                </li>
                <li
                  className={`absolute -top-2 left-[120px] h-1/2 -ml-[2.6rem] origin-bottom group`}
                  style={{ transform: `rotate(${4 * 55}deg)` }}
                >
                  <div
                    className={` flex   w-fit rounded-xl border border-n-6`}
                    style={{
                      transform: `rotate(-${4 * 55}deg)`,
                      margin: "10px",
                    }}
                  >
                    <PaletteIcon size={50} className="px-2 text-blue-400" />
                  </div>
                  <Image
                    className="m-auto relative -mt-24 left-16 opacity-0 group-hover:opacity-100 transition-opacity rotate-[135deg] "
                    width={130}
                    height={150}
                    alt={"k"}
                    src={"/themesIcon3.png"}
                  />
                </li>
                <li
                  className={`absolute top-0 left-[120px] h-1/2 -ml-[3rem] origin-bottom group`}
                  style={{ transform: `rotate(${6 * 50}deg)` }}
                >
                  <Image
                    className="m-auto   -mt-8 mr-4 relative -left-12 -top-8   opacity-0 group-hover:opacity-100 transition-opacity rotate-[60deg] "
                    width={130}
                    height={150}
                    alt={"k"}
                    src={"/configIcon3.png"}
                  />
                  <div
                    className={`relative    w-fit rounded-xl border border-n-6`}
                    style={{
                      transform: `rotate(-${6 * 50}deg)`,
                      margin: "10px",
                    }}
                  >
                    <SettingsIcon size={50} className="px-2" color="#9F53FF" />
                  </div>
                </li>
                <Gradient />
              </ul>

              <LeftCurve />
              <RightCurve />
            </div>
          </div>
        </div>
      </Section>

      <Section className="!px-0 !py-2 relative" id={"#footer"}>
        <BottomLine classname="top-[3.49rem]" />
        <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col py-2">
          <Image
            src={"/logo-header.png"}
            width={110}
            height={70}
            alt="logo"
            className="mt-14 pl-8"
          />
          <p className="caption text-n-4 lg:block  mt-16 pr-8">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default HomePage;
