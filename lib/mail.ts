import { Resend } from "resend";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Planning Soutenance. Code de verification",
      html: `<p>Verification code: ${token}</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
  // await resend.emails.send({
  //   from: " Dev<onboarding@resend.dev>",
  //   to: email,
  //   subject: "2FA Code",
  //   html: `<p>Your 2FA code: ${token}</p>`,
  // });
};
