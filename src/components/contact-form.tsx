import { type FormEvent, useRef, useState } from "react";
import { copy, t } from "../content/copy";
import type { Locale } from "../i18n";
import { buttonVariants } from "./ui/button";

const endpoint = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

const fieldClass =
	"mt-2 block w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-base forced-colors:border-[CanvasText]";

/**
 * Contact form posting to Web3Forms. `accessKey` is a public key that can only
 * deliver to the owner's inbox (ADR-009); without it the form is not shown.
 */
export function ContactForm({
	locale,
	accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
}: {
	locale: Locale;
	accessKey?: string;
}) {
	const page = copy.contactPage;
	const [status, setStatus] = useState<Status>("idle");
	const formRef = useRef<HTMLFormElement>(null);

	if (!accessKey) return null;

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		if (!form.checkValidity()) {
			setStatus("invalid");
			return;
		}
		const data = new FormData(form);
		// A bot filled the hidden checkbox: pretend it worked and send nothing.
		if (data.get("botcheck")) {
			setStatus("success");
			return;
		}
		setStatus("sending");
		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					access_key: accessKey,
					name: data.get("name"),
					email: data.get("email"),
					subject:
						data.get("subject") || `Portfolio contact from ${data.get("name")}`,
					message: data.get("message"),
					from_name: "gmartins.dev",
				}),
			});
			const result = (await response.json()) as { success?: boolean };
			if (response.ok && result.success) {
				formRef.current?.reset();
				setStatus("success");
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	}

	const message =
		status === "success"
			? page.success
			: status === "error"
				? page.error
				: status === "invalid"
					? page.required
					: null;

	return (
		<form
			ref={formRef}
			onSubmit={onSubmit}
			noValidate
			className="mt-10 grid max-w-xl gap-6"
		>
			<div>
				<label htmlFor="contact-name">{t(page.name, locale)}</label>
				<input
					id="contact-name"
					name="name"
					type="text"
					autoComplete="name"
					required
					maxLength={120}
					className={fieldClass}
				/>
			</div>
			<div>
				<label htmlFor="contact-email">{t(page.email, locale)}</label>
				<input
					id="contact-email"
					name="email"
					type="email"
					autoComplete="email"
					required
					maxLength={200}
					className={fieldClass}
				/>
			</div>
			<div>
				<label htmlFor="contact-subject">{t(page.subject, locale)}</label>
				<input
					id="contact-subject"
					name="subject"
					type="text"
					maxLength={200}
					className={fieldClass}
				/>
			</div>
			<div>
				<label htmlFor="contact-message">{t(page.message, locale)}</label>
				<textarea
					id="contact-message"
					name="message"
					rows={6}
					required
					maxLength={5000}
					className={fieldClass}
				/>
			</div>
			{/* Honeypot: hidden from people and assistive tech, bots tick it. */}
			<input
				type="checkbox"
				name="botcheck"
				tabIndex={-1}
				aria-hidden="true"
				autoComplete="off"
				className="hidden"
			/>
			<div className="flex flex-wrap items-center gap-4">
				<button
					type="submit"
					disabled={status === "sending"}
					className={buttonVariants({
						variant: "brand",
						className: "disabled:opacity-60 print:hidden",
					})}
				>
					{t(status === "sending" ? page.sending : page.submit, locale)}
				</button>
				<p
					role="status"
					className={
						status === "error" || status === "invalid"
							? "text-destructive"
							: "text-muted-foreground"
					}
				>
					{message ? t(message, locale) : null}
				</p>
			</div>
		</form>
	);
}
