// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { professionalWork } from "../content/professional-work";
import { ProfessionalWorkItem } from "./work";

afterEach(cleanup);

describe("ProfessionalWorkItem", () => {
	it("shows the role and period from experience and links to the product", () => {
		const vochlea = professionalWork.find((work) => work.slug === "vochlea");
		if (!vochlea) throw new Error("missing Vochlea entry");
		render(<ProfessionalWorkItem work={vochlea} locale="en" />);

		const article = screen.getByRole("article");
		expect(article.id).toBe("vochlea");
		expect(
			screen.getByRole("heading", { level: 3, name: "Vochlea" }),
		).toBeTruthy();
		expect(within(article).getByText("Full-Stack Developer")).toBeTruthy();
		expect(
			within(article).getByText("Jan 2024 - Aug 2024, London, UK"),
		).toBeTruthy();
		const link = screen.getByRole("link", {
			name: /^Visit the product ?\(Vochlea\)$/,
		});
		expect(link.getAttribute("href")).toBe("https://vochlea.com");
	});

	it("renders in Portuguese without a stack or image when none is set", () => {
		const nisien = professionalWork.find((work) => work.slug === "nisien-ai");
		if (!nisien) throw new Error("missing Nisien.ai entry");
		render(
			<ProfessionalWorkItem
				work={{ ...nisien, stack: undefined, image: undefined }}
				locale="pt-BR"
			/>,
		);
		expect(screen.queryByRole("img")).toBeNull();
		expect(
			screen.getByRole("heading", { level: 4, name: "O que eu fiz" }),
		).toBeTruthy();
		expect(
			screen.getByRole("link", { name: /^Ver o produto ?\(Hero Platform\)$/ }),
		).toBeTruthy();
	});
});
