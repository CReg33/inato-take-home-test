import { MIN_BENEFIT, MAX_BENEFIT, DRUGS } from "./drug.constants";

export class Drug {
  constructor(name, expiresIn, benefit) {
    if (benefit < MIN_BENEFIT) {
      throw new Error(`benefit must be > ${MIN_BENEFIT}`);
    }
    if (benefit > MAX_BENEFIT) {
      throw new Error(`benefit must be < ${MAX_BENEFIT}`);
    }
    if (!Object.values(DRUGS).includes(name)) {
      throw new Error(`${name} is not part of registered drugs`);
    }
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateStandardDrugBenefit(degradation) {
    this.expiresIn -= 1;
    if (this.benefit === 0) {
      return;
    }
    if (this.expiresIn < 0) {
      this.benefit -= degradation * 2;
      return;
    }
    this.benefit -= degradation;
  }

  updateHerbalTeaBenefit() {
    this.expiresIn -= 1;
    if (this.expiresIn < 0) {
      this.benefit += 2;
      return;
    }
    this.benefit += 1;
  }

  updateFervexBenefit() {
    this.expiresIn -= 1;
    if (this.expiresIn < 0) {
      this.benefit = 0;
      return;
    }
    if (this.expiresIn < 5) {
      this.benefit += 3;
      return;
    }
    if (this.expiresIn < 10) {
      this.benefit += 2;
      return;
    }
    this.benefit += 1;
  }

  updateDafalganBenefit() {
    this.updateStandardDrugBenefit(2);
  }

  checkMinAndMaxBenefit() {
    if (this.benefit > MAX_BENEFIT) {
      this.benefit = MAX_BENEFIT;
    }
    if (this.benefit < MIN_BENEFIT) {
      this.benefit = MIN_BENEFIT;
    }
  }

  updateBenefit() {
    switch (this.name) {
      case DRUGS.MAGIC_PILL:
        break;
      case DRUGS.HERBAL_TEA:
        this.updateHerbalTeaBenefit();
        break;
      case DRUGS.FERVEX:
        this.updateFervexBenefit();
        break;
      case DRUGS.DAFALGAN:
        this.updateDafalganBenefit();
        break;
      default:
        this.updateStandardDrugBenefit(1);
        break;
    }
    this.checkMinAndMaxBenefit();
    return this;
  }
}
