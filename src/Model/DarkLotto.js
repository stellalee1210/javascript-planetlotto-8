import { Random } from "@woowacourse/mission-utils";

class DarkLotto {
  #randomNum;

  constructor() {
    this.#pickRandom();
  }

  #pickRandom() {
    this.#randomNum = Random.pickUniqueNumbersInRange(1, 5, 1);
  }

  isMatch(guess) {
    if (guess % this.#randomNum === 0) return true;
    return false;
  }
}

export const darkLotto = new DarkLotto();
