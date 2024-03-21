"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Image from "next/image";
import { BackButton } from "@/components/back-button";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <main className="grid place-content-center  bg-slate-100 h-full w-full ">
      <section className="flex flex-col p-6 gap-5 items-center  md:w-[400px]  bg-white shadow-md rounded-md w-[350px]">
        <div className="flex flex-col   gap-5 items-center w-full  bg-white  flex-1 ">
          <Image
            src="/logo.png"
            height={130}
            width={130}
            alt="logo"
            className="m-4"
          />
          {!success && !error && <BeatLoader />}
          {success && <FormSuccess message={success} />}
          {!success && <FormError message={error} />}
        </div>
        <BackButton href="/login" label="Back To Login" />
      </section>
    </main>
  );
};
export default NewVerificationForm;
