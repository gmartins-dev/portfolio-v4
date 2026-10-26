// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

async function fill(user: ReturnType<typeof userEvent.setup>) {
	await user.type(screen.getByLabelText("Name"), "Ada");
	await user.type(screen.getByLabelText("Email"), "ada@example.com");
	await user.type(screen.getByLabelText("Message"), "Hello there");
}

const reply = (ok: boolean, success: boolean) =>
	vi.fn().mockResolvedValue({ ok, json: async () => ({ success }) });

describe("ContactForm", () => {
	it("renders nothing without an access key", () => {
		const { container } = render(<ContactForm locale="en" accessKey="" />);
		expect(container.innerHTML).toBe("");
	});

	it("blocks an incomplete submission", async () => {
		const fetchMock = reply(true, true);
		vi.stubGlobal("fetch", fetchMock);
		const user = userEvent.setup();
		render(<ContactForm locale="en" accessKey="key" />);
		await user.click(screen.getByRole("button", { name: "Send message" }));
		expect(screen.getByRole("status").textContent).toContain(
			"Fill in your name",
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("posts JSON to Web3Forms and confirms", async () => {
		const fetchMock = reply(true, true);
		vi.stubGlobal("fetch", fetchMock);
		const user = userEvent.setup();
		render(<ContactForm locale="en" accessKey="key" />);
		await fill(user);
		await user.click(screen.getByRole("button", { name: "Send message" }));
		await waitFor(() =>
			expect(screen.getByRole("status").textContent).toContain("Message sent"),
		);
		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe("https://api.web3forms.com/submit");
		expect(JSON.parse(init.body)).toMatchObject({
			access_key: "key",
			name: "Ada",
			email: "ada@example.com",
			message: "Hello there",
		});
	});

	it("shows an error when the service rejects or the network fails", async () => {
		const user = userEvent.setup();
		vi.stubGlobal("fetch", reply(false, false));
		render(<ContactForm locale="pt-BR" accessKey="key" />);
		await user.type(screen.getByLabelText("Nome"), "Ada");
		await user.type(screen.getByLabelText("Email"), "ada@example.com");
		await user.type(screen.getByLabelText("Mensagem"), "Oi");
		await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
		await waitFor(() =>
			expect(screen.getByRole("status").textContent).toContain(
				"Não foi possível",
			),
		);
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
		await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
		await waitFor(() =>
			expect(screen.getByRole("status").textContent).toContain(
				"Não foi possível",
			),
		);
	});

	it("sends nothing when the honeypot is ticked", async () => {
		const fetchMock = reply(true, true);
		vi.stubGlobal("fetch", fetchMock);
		const user = userEvent.setup();
		const { container } = render(<ContactForm locale="en" accessKey="key" />);
		await fill(user);
		const trap = container.querySelector<HTMLInputElement>("[name=botcheck]");
		trap?.click();
		await user.click(screen.getByRole("button", { name: "Send message" }));
		expect(fetchMock).not.toHaveBeenCalled();
	});
});
