import validator from "validator";

export const msToMinutes = (millis: number) => {
  var minutes = Math.floor(millis / 60000);
  return minutes;
};

export const checkFormParameters = (
  name: string,
  email: string,
  subject: string,
  message: string,
) => {
  if (!validator.isAlpha(name, "en-US", { ignore: " -" }))
    throw new Error("Not a valid name");
  if (!validator.isEmail(email)) throw new Error("Not a valid email");
  if (!validator.isAlphanumeric(subject, "en-US", { ignore: " -" }))
    throw new Error("Not a valid subject");
  if (!validator.isAlphanumeric(message, "en-US", { ignore: " -" }))
    throw new Error("Not a valid message");
};

export const sanitizeFormParameters = (
  name: string,
  email: string,
  subject: string,
  message: string,
): { name: string; email: string; subject: string; message: string } => {
  return {
    name: validator.escape(name),
    email: validator.escape(email),
    subject: validator.escape(subject),
    message: validator.escape(message),
  };
};
