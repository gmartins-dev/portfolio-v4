// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { copy } from "../content/copy";
import { locales } from "../i18n";
import {
	cardOutline,
	geometry,
	IdentityMap,
	motion,
	offsetClasses,
	photoTopClass,
} from "./identity-map";

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
			expect(photo.getAttribute("width")).toBe("208");
			expect(photo.getAttribute("height")).toBe("208");
			expect(photo.getAttribute("loading")).toBeNull();

			expect(container.querySelector("h1")).toBeNull();
			expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
				"true",
			);
		});
	}

	it("centers the portrait on the card stack", () => {
		const stack =
			geometry.offsets.length * geometry.cardHeight +
			(geometry.offsets.length - 1) * geometry.cardGap;
		expect(photoTopClass).toBe(
			`lg:top-[${stack / 2 - geometry.photo.radius}px]`,
		);
	});

	it("offsets each card by the arc geometry the connectors use", () => {
		expect(offsetClasses).toEqual(
			geometry.offsets.map((offset) => `lg:ml-[${offset}px]`),
		);
		expect(offsetClasses).toHaveLength(copy.home.identityMap.dimensions.length);
	});

	it("renders the static map without the loop's overlays", () => {
		const { container } = render(<IdentityMap locale="en" />);
		for (const item of screen.getAllByRole("listitem")) {
			expect(item.className).toContain("border-brand");
			expect(item.className).not.toContain("bg-muted");
		}
		expect(
			container.querySelector(
				".identity-pulse, .identity-pulse-back, .identity-trace, .identity-radiate, .identity-ring",
			),
		).toBeNull();
	});

	it("ends every motion phase within one step", () => {
		const { stepMs, ...phases } = motion;
		for (const [name, phase] of Object.entries(phases)) {
			expect(phase.start + phase.ms, name).toBeLessThan(stepMs);
		}
	});

	it("traces each card border from the left middle to the right middle", () => {
		for (const offset of geometry.offsets) {
			const { width, height, top, bottom } = cardOutline(offset);
			expect(width).toBe(geometry.width - offset);
			expect(height).toBe(geometry.cardHeight);
			for (const path of [top, bottom]) {
				expect(path.startsWith(`M0.5 ${height / 2} `)).toBe(true);
				expect(
					path.endsWith(
						`A8 8 0 0 ${path === top ? 1 : 0} ${width - 0.5} ${path === top ? 8.5 : height - 8.5} V${height / 2}`,
					),
				).toBe(true);
			}
		}
	});
});
