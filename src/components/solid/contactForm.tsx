import { type JSX } from "solid-js";
import { createSignal, createResource, Suspense } from "solid-js";
import {
  checkFormParameters,
  sanitizeFormParameters,
} from "../../pages/api/helpers/utils";

async function postFormData(formData: FormData) {
  try {
    const formName = formData.get("name")?.toString();
    const formEmail = formData.get("email")?.toString();
    const formSubject = formData.get("subject")?.toString();
    const formMessage = formData.get("message")?.toString();

    if (!formName || !formEmail || !formSubject || !formMessage)
      throw new Error("Fields are missing");

    const { name, email, subject, message } = sanitizeFormParameters(
      formName,
      formEmail,
      formSubject,
      formMessage,
    );

    checkFormParameters(name, email, subject, message);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
        code: 400,
      }),
      { status: 400 },
    );
  }
}

export function Form(props: { children: JSX.Element }) {
  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setFormData(new FormData(e.target as HTMLFormElement));
  }

  return (
    <form onSubmit={submit}>
      <div class="form-alert-container">
        <Suspense>
          {console.log(response())}
          {response() && (
            <div
              class={
                "alert " + `${response().code === 200 ? "success" : "error"}`
              }
            >
              <span>{response().message}</span>
            </div>
          )}
        </Suspense>
      </div>
      <input type="text" class="text-input" name="name" placeholder="Name" />
      <input type="email" class="text-input" name="email" placeholder="Email" />
      <input
        type="text"
        class="text-input"
        name="subject"
        placeholder="Subject"
      />
      <textarea
        class="text-area"
        name="message"
        placeholder="Message"
      ></textarea>
      {props.children}
    </form>
  );
}
