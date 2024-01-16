import { type JSX } from "solid-js";
import { createSignal, createResource, Suspense } from "solid-js";

async function postFormData(formData: FormData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
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
          {response() && (
            <div class="alert">
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
