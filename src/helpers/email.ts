import { Resend } from "resend";
import { msToMinutes } from "./utils";

const knownIps: { [key: string]: number } = {};

export const sendEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string,
  clientIp: string,
) => {
  const currentMillis = Date.now();
  const coolDownMs = 60000 * 3;

  if (knownIps[clientIp] && currentMillis < knownIps[clientIp] + coolDownMs)
    throw new Error(
      `Too soon to send another message. Try again in: ${msToMinutes(
        knownIps[clientIp] + coolDownMs - currentMillis,
      )} minutes`,
    );

  const PRIVATE_KEY = import.meta.env.RESEND_API_KEY;
  const resend = new Resend(PRIVATE_KEY);

  await resend.emails.send({
    from: "website@resend.dev",
    to: "ralvarezcm@gmail.com",
    subject: subject,
    html: `name : ${name}, email: ${email}, message: ${message}`,
  });

  knownIps[clientIp] = currentMillis;

  return true;
};
