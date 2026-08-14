import { describe, expect, it } from "vitest";
import { clampGalleryZoom, getGalleryIndex, getPinchZoom } from "./productGalleryMath";

describe("product gallery interaction math", () => {
  it("keeps zoom inside the inspection room limits", () => {
    expect(clampGalleryZoom(.4)).toBe(1);
    expect(clampGalleryZoom(1.75)).toBe(1.75);
    expect(clampGalleryZoom(3.5)).toBe(2.25);
  });

  it("wraps gallery navigation in both directions", () => {
    expect(getGalleryIndex(0, -1, 4)).toBe(3);
    expect(getGalleryIndex(3, 1, 4)).toBe(0);
    expect(getGalleryIndex(0, 1, 0)).toBe(0);
  });

  it("converts a pinch ratio into a bounded zoom level", () => {
    expect(getPinchZoom(1, 100, 150)).toBe(1.5);
    expect(getPinchZoom(2, 100, 200)).toBe(2.25);
    expect(getPinchZoom(1.5, 0, 200)).toBe(1.5);
  });
});
