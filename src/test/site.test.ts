import { describe, it, expect } from "vitest";
import { kilanguTotal, kilanguMessage, isValidIndianPhone, BIZ } from "@/lib/site";

describe("business rules", () => {
  it("kilangu costs ₹150 per kg", () => {
    expect(kilanguTotal(1)).toBe(150);
    expect(kilanguTotal(3)).toBe(450);
  });
  it("order message includes qty and total", () => {
    expect(kilanguMessage(2)).toContain("Quantity: 2 kg. Total: ₹300.");
  });
  it("group minimum is 10", () => expect(BIZ.groupMin).toBe(10));
  it("validates Indian phone numbers", () => {
    expect(isValidIndianPhone("9361072656")).toBe(true);
    expect(isValidIndianPhone("12345")).toBe(false);
  });
});
