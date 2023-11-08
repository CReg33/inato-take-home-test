import { Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should initialize a Pharmacy without drugs", () => {
    expect(new Pharmacy().drugs).toEqual([]);
  });
});
