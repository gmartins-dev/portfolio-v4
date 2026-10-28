// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { copy } from "../content/copy";
import { locales } from "../i18n";
import {
	absorb,
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
			expect(photo.getAttribute("width")).toBe("240");
			expect(photo.getAttribute("height")).toBe("240");
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

	it("sizes the column and the portrait from the geometry", () => {
		const { container } = render(<IdentityMap locale="en" />);
		expect(container.querySelector("section")?.className).toContain(
			`lg:w-[${geometry.width}px]`,
		);
		expect(screen.getByRole("img").className).toContain(
			`lg:size-[${geometry.photo.radius * 2}px]`,
		);
	});

	it("puts every dot on the dashed arc", () => {
		const stack =
			geometry.offsets.length * geometry.cardHeight +
			(geometry.offsets.length - 1) * geometry.cardGap;
		const dots = geometry.offsets.map((offset, index) => ({
			x: offset - geometry.dotInset,
			y:
				index * (geometry.cardHeight + geometry.cardGap) +
				geometry.cardHeight / 2,
		}));
		// The arc runs from the first dot to the last, so its center sits on
		// the stack's middle line, to the left of the dots.
		const first = dots[0];
		const centerX =
			first.x - Math.sqrt(geometry.arcRadius ** 2 - (stack / 2 - first.y) ** 2);
		for (const dot of dots) {
			const distance = Math.hypot(dot.x - centerX, dot.y - stack / 2);
			expect(Math.abs(distance - geometry.arcRadius)).toBeLessThan(1);
		}
	});

	it("offsets each card by the arc geometry the connectors use", () => {
		expect(offsetClasses).toEqual(
			geometry.offsets.map((offset) => `lg:ml-[${offset}px]`),
		);
		expect(offsetClasses).toHaveLength(copy.home.identityMap.dimensions.length);
	});

	it("renders the static map without the sequence's overlays", () => {
		const { container } = render(<IdentityMap locale="en" />);
		for (const item of screen.getAllByRole("listitem")) {
			expect(item.className).toContain("border-brand");
			expect(item.className).not.toContain("bg-muted");
		}
		expect(
			container.querySelector(
				".identity-pulse, .identity-trace, .identity-radiate, .identity-absorb, .identity-orbit, .identity-charge",
			),
		).toBeNull();
	});

	it("closes with beams back, then one orbit, then the glow", () => {
		const end = (phase: { start: number; ms: number }) =>
			phase.start + phase.ms;
		// The orbit starts as the beams land, the glow as the orbit closes.
		expect(
			Math.abs(absorb.orbit.start - end(absorb.beams)),
		).toBeLessThanOrEqual(60);
		expect(
			Math.abs(absorb.charge.start - end(absorb.orbit)),
		).toBeLessThanOrEqual(60);
		// The last card's own effects are under way before the beams leave.
		expect(absorb.beams.start).toBeGreaterThanOrEqual(motion.radiate.start);
		expect(end(absorb.charge)).toBeLessThan(3500);
	});

	it("finishes the whole sequence within four seconds", () => {
		const { stepMs, ...phases } = motion;
		const lastStart = (copy.home.identityMap.dimensions.length - 1) * stepMs;
		for (const [name, phase] of Object.entries(phases)) {
			expect(lastStart + phase.start + phase.ms, name).toBeLessThan(4000);
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
