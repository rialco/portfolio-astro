import type { APIRoute } from "astro";
import { sendEmail } from "./helpers/email";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress;
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    const subject = data.get("subject")?.toString();
    const message = data.get("message")?.toString();

    if (!name || !email || !subject || !message)
      throw new Error("Fields are missing");

    await sendEmail(name, email, subject, message, ip);

    return new Response(
      JSON.stringify({
        message: "Message successfully sended",
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 400 },
    );
  }
};
