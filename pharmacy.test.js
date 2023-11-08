import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should initialize a Pharmacy without drugs", () => {
    expect(new Pharmacy().drugs).toEqual([]);
  });
  it("should update benefit and expiresIn of all drugs according to their specificities", () => {
    const initialDrugs = [
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 12, 35),
      new Drug("Magic Pill", 15, 40),
    ];
    const updatedDrugs = [
      new Drug("Doliprane", 19, 29),
      new Drug("Herbal Tea", 9, 6),
      new Drug("Fervex", 11, 36),
      new Drug("Magic Pill", 15, 40),
    ];
    expect(new Pharmacy(initialDrugs).updateBenefitValue()).toEqual(updatedDrugs);
  });

  describe("Drugs constructor", () => {
    it("should throw if a drug is intialized with a benefit < 0", () => {
      expect(() => new Drug("Doliprane", 20, -1)).toThrow(
        new Error("benefit must be > 0")
      );
    });
    it("should throw if a drug is intialized with a benefit > 50", () => {
      expect(() => new Drug("Doliprane", 20, 51)).toThrow(
        new Error("benefit must be < 50")
      );
    });
    it("should throw if a drug is not registered", () => {
      expect(() => new Drug("Spasfon", 10, 40)).toThrow(
        new Error("Spasfon is not part of registered drugs")
      );
    });
  });

  describe("standard drugs", () => {
    it("should not decrease the benefit if it's already equal to 0", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 22, 0)]).updateBenefitValue()
      ).toEqual([new Drug("Doliprane", 21, 0)]);
    });
    it("should decrease by 1 the benefit and expiresIn", () => {
      expect(new Pharmacy([new Drug("Doliprane", 2, 3)]).updateBenefitValue()).toEqual(
        [new Drug("Doliprane", 1, 2)]
      );
    });
    it("should decrease by 2 the benefit once expiresIn < 0", () => {
      expect(new Pharmacy([new Drug("Doliprane", -2, 3)]).updateBenefitValue()).toEqual(
        [new Drug("Doliprane", -3, 1)]
      );
    });
  });

  describe("Herbal Tea", () => {
    it("should increase by 1 the benefit as expiresIn decreases by 1", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 30, 3)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", 29, 4)]
      );
    });
    it("should increase by 2 the benefit once expiresIn < 0", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", -1, 3)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", -2, 5)]
      );
    });
    it("should not increase the benefit once it's equal to 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 22, 50)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", 21, 50)]);
    });
  });

  describe("Magic Pill", () => {
    it("should never change expiresIn and benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 20, 30)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 20, 30)]);
    });
  });

  describe("Fervex", () => {
    it("should decrease by 1 expiresIn and increase by 1 benefit", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 20, 30)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 19, 31)]);
    });
    it("should decrease by 2 expiresIn and increase by 2 benefit if 5 <= expiresIn <= 10 ", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 30)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 9, 32)]);
    });
    it("should decrease expiresIn and increase benefit if 5 <= expiresIn <= 10 without exceeding 50", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 49)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 9, 50)]);
    });
    it("should decrease by 3 expiresIn and increase by 3 benefit if 0 <= expiresIn < 5 ", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 30)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 4, 33)]);
    });

    it("should decrease by 3 expiresIn and increase by 3 benefit if 0 <= expiresIn < 5 without exceeding 50", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 48)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 4, 50)]);
    });
    it("should drop benefit to 0 if expiresIn <= 0", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 30)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });
  });

});
