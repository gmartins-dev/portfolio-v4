// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { copy } from "../content/copy";
import { locales } from "../i18n";
import { geometry, IdentityMap, offsetClasses } from "./identity-map";

afterEach(cleanup);

describe("IdentityMap", () => {
	for (const locale of locales) {
		it(`lists the six dimensions in order with the portrait (${locale})`, () => {
			const { container } = render(<IdentityMap locale={locale} />);
			const map = copy.home.identityMap;

			const list = screen.getByRole("list", { name: map.listLabel[locale] });
			const items = within(list).getAllByRole("listitem");
			expect(items).toHaveLength(6);
			for (const [index, dimension] of map.dimensions.entries()) {
				expect(
					within(items[index]).getByText(dimension.title[locale]),
				).toBeTruthy();
			}

			const photo = screen.getByRole("img", { name: map.photoAlt[locale] });
			expect(photo.getAttribute("alt")).not.toBe("");
			expect(photo.getAttribute("width")).toBe("160");
			expect(photo.getAttribute("height")).toBe("160");
			expect(photo.getAttribute("loading")).toBeNull();

			expect(container.querySelector("h1")).toBeNull();
			expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
				"true",
			);
		});
	}

	it("offsets each card by the arc geometry the connectors use", () => {
		expect(offsetClasses).toEqual(
			geometry.offsets.map((offset) => `lg:ml-[${offset}px]`),
		);
		expect(offsetClasses).toHaveLength(copy.home.identityMap.dimensions.length);
	});
});
