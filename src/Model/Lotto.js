import { LOTTO } from "../constants.js";

export class Lotto {
  #numbers;
  #rank;
  constructor(numbers) {
    this.#numbers = numbers;
  }

  #save(match, isBonusMatch) {
    if (match === LOTTO.MATCH[4].NUMBER && isBonusMatch) {
      this.#rank = LOTTO.MATCH[4].BONUS.RANK;
      return;
    }

    this.#rank = LOTTO.MATCH[match].RANK;
  }

  toString() {
    return [...this.#numbers];
  }

  result() {
    const copy = this.#rank;
    return copy;
  }
  match(winningNum, bonusNum) {
    const match = winningNum.filter((number) =>
      this.#numbers.includes(number),
    ).length;
    const isBonusMatch = this.#numbers.includes(bonusNum);

    this.#save(match, isBonusMatch);
  }
}
