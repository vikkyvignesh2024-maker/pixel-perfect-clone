import { describe, it, expect } from "vitest";
import { isValidIndianPhone, BIZ } from "@/lib/site";

describe("business rules", () => {
  it("soup serving is one cup", () => expect(BIZ.soupServingCups).toBe(1));
  it("stay enquiries use the supplied Instagram account", () => {
    expect(BIZ.instagram).toBe("https://www.instagram.com/mp.snacks_2025/");
  });
  it("group minimum is 10", () => expect(BIZ.groupMin).toBe(10));
  it("validates Indian phone numbers", () => {
    expect(isValidIndianPhone("9361072656")).toBe(true);
    expect(isValidIndianPhone("12345")).toBe(false);
  });
});
