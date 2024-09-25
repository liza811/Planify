"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";

import Section from "./section";
import { ScrollParallax } from "react-just-parallax";
import { BackgroundCircles, BottomLine } from "./hero";
import TitleSection from "./title-section";

export const Landing = () => {
  const parallaxRef = useRef(null);
  return (
    <Section
      className="mt-1 "
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <section
        ref={parallaxRef}
        className=" relative
        w-full
        lg:pt-[10rem]
      px-4
      pt-[6rem]
      sm:px-6
   
      sm:flex
      sm:flex-col
      gap-4
      md:justify-center
      md:items-center"
      >
        <TitleSection
          pill="✨ Votre Espace, Perfectionné"
          title="Plateforme pour Collaboration et Productivité"
        />
        <div
          className="bg-white
          p-[2px]
          mt-6
          z-30
          hidden
          md:block
          rounded-xl
          bg-gradient-to-r 
         from-[hsl(266,100%,50%)]
          to-brand-primaryBlue
          sm:w-[300px]
        "
        >
          <Button
            variant="btn-secondary"
            className=" w-full
              
            rounded-[10px]
            p-4
            text-xl
            bg-background
            bg-[hsl(249,100%,3.9%)]
            px-0
          "
          >
            Essayez Maintenant
          </Button>
        </div>
        <div
          className="
          sm:w-full
          
          flex
          justify-center
          items-center
         -mt-7
          relative
         
         
        "
        >
          <div
            className="w-[30%]
          blur-[120px]
          rounded-full
          h-32
          absolute
          bg-brand-primaryPurple/50
        
         
        "
          />
          <BackgroundCircles parallaxRef={220} />
          {/* <div
            className="w-[30%]
            blur-[120px]
            rounded-full
            h-32
            absolute
            bg-brand-primaryPurple/50
            -z-10
            top-22
          "
          ></div> */}
        </div>
        <div
          className="
            
            -ml-4
         w-[380px]
       lg:w-[900px]
       md:-ml-0
        "
        >
          <Image
            src={"/main.png"}
            alt="Application Banner"
            className="z-10 mt-10 md:mt-0 "
            width={900}
            height={400}
          />
        </div>

        <ScrollParallax isAbsolutelyPositioned zIndex={40}>
          <div
            className={`hidden xl:flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem]  absolute right-[1.5rem] bottom-[16rem] w-[16rem]  text-base`}
          >
            <Image
              className="w-5 h-5 mr-4"
              width={20}
              height={20}
              src={"/loading.png"}
              alt="Loading"
            />
            Generating...
          </div>
        </ScrollParallax>
        <ScrollParallax isAbsolutelyPositioned zIndex={40}>
          <ul className="hidden absolute left-[4.5rem] bottom-[9.5rem] px-1 py- bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex z-50">
            <li className="p-5 z-50">
              <Image
                src={"/home-smile.svg"}
                width={24}
                height={25}
                alt={"icon"}
              />
            </li>
            <li className="p-5">
              <Image src={"/file-02.svg"} width={24} height={25} alt={"icon"} />
            </li>
            <li className="p-5">
              <Image
                src={"/search-md.svg"}
                width={24}
                height={25}
                alt={"icon"}
              />
            </li>
            <li className="p-5">
              <Image
                src={"/plus-square.svg"}
                width={24}
                height={25}
                alt={"icon"}
              />
            </li>
          </ul>
        </ScrollParallax>
      </section>

      <BottomLine classname="top-[54.2rem]" />
    </Section>
  );
};
