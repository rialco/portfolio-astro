import type { APIRoute } from "astro";
import { sendEmail } from "../../helpers/email";
import {
  checkFormParameters,
  sanitizeFormParameters,
} from "../../helpers/utils";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress;
    const body = await request.json();

    const { name, email, subject, message } = sanitizeFormParameters(
      body.name,
      body.email,
      body.subject,
      body.message,
    );

    checkFormParameters(name, email, subject, message);

    await sendEmail(name, email, subject, message, ip);

    return new Response(
      JSON.stringify({
        message: "Message successfully sended",
        code: 200,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
        code: 400,
      }),
      { status: 400 },
    );
  }
};
