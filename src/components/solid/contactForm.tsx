import { type JSX } from "solid-js";
import { createSignal, createResource, Suspense } from "solid-js";
import {
  checkFormParameters,
  sanitizeFormParameters,
} from "../../helpers/utils";

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
    <>
      <style>{`
      form {
        position: relative;
        width: 100%;
        max-width: 500px;
        display: block;
        margin: auto;
        margin-top: 40px;
        margin-bottom: 100px;
      }
      
      input {
        display: block;
        width: 90%;
        height: 50px;
        margin: auto;
        margin-bottom: 10px;
        padding-left: 20px;
        border-radius: 4px;
      
        background-color: hsl(0, 0%, 95%);
        border: none;
      
        font-size: 0.95em;
      }
      
      textarea {
        display: block;
        width: 90%;
        height: 150px;
        margin: auto;
        margin-bottom: 10px;
        padding-left: 20px;
        padding-top: 10px;
        border-radius: 4px;
      
        background-color: hsl(0, 0%, 95%);
        border: none;
      
        font-size: 0.95em;
      }
      
      div.alert {
        padding: 20px;
        border-radius: 6px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
      }
      
      div.success {
        background-color: hsl(81, 20%, 80%);
      }
      
      div.error {
        background-color: hsl(0, 73%, 56%);
        color: white;
      }
      
      div.alert > svg {
        font-size: 1.8rem;
        margin-right: 10px;
      }
      
    `}</style>
      <form onSubmit={submit}>
        <div class="form-alert-container">
          <Suspense>
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
        <input
          type="email"
          class="text-input"
          name="email"
          placeholder="Email"
        />
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
    </>
  );
}
