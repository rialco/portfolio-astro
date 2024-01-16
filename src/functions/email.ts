import { Resend } from "resend";
import validator from "validator";

const knownIps: { [key: string]: number } = {};

export const sendEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string,
  clientIp: string,
) => {
  const currentMillis = Date.now();
  const tenMinutesMs = 60000 * 10;

  if (knownIps[clientIp] && currentMillis < knownIps[clientIp] + tenMinutesMs)
    throw new Error("Too soon to send another message");

  const PRIVATE_KEY = import.meta.env.RESEND_API_KEY;
  const resend = new Resend(PRIVATE_KEY);

  if (!validator.isAlpha(name)) throw new Error("Not a valid name");
  if (!validator.isEmail(email)) throw new Error("Not a valid email");
  if (!validator.isAlphanumeric(subject))
    throw new Error("Not a valid subject");
  if (!validator.isAlphanumeric(message))
    throw new Error("Not a valid message");

  await resend.emails.send({
    from: "website@resend.dev",
    to: "ralvarezcm@gmail.com",
    subject: subject,
    html: `name : ${name}, email: ${email}, message: ${message}`,
  });

  knownIps[clientIp] = currentMillis;

  return true;
};
