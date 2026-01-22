export class Lotto {
  #numbers;
  constructor(numbers) {
    this.#numbers = numbers;
  }

  toString() {
    return [...this.#numbers];
  }

  match(winningNum, bonusNum) {
    const match = winningNum.filter((number) =>
      this.#numbers.includes(number)
    ).length;
    const isBonusMatch = this.#numbers.includes(bonusNum);
    return [match, isBonusMatch];
  }
}
