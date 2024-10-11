"use client";

import Image from "next/image";

import { PT_Serif } from "next/font/google";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";
export const font = PT_Serif({
  subsets: ["latin"],
  weight: ["700"],
});

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccesss] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccesss("");

    startTransition(() => {
      Login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccesss(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <section className="flex flex-col p-6 gap-5 items-center  md:w-[400px]  bg-white shadow-md rounded-md w-[350px]">
      <div className="flex flex-col   gap-5 items-center w-full  bg-white  flex-1 ">
        <div
          className="
    w-[100px]
    flex
    justify-center
    items-center"
        >
          <Image src={"/logo-colore.png"} alt="Logo" width={100} height={50} />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <div className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Matricule</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="**********"
                            type="password"
                          />
                        </FormControl>
                        <Button
                          name="password"
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        ></Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              name="login"
              type="submit"
              className="w-full bg-primary_blue "
              variant={"primary"}
              disabled={isPending}
            >
              {isPending ? (
                <ClipLoader color="white" size={17} />
              ) : showTwoFactor ? (
                "Confirmer"
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
