import { Random } from "@woowacourse/mission-utils";
import { LOTTO } from "../../constants.js";
import { Lotto } from "./Lotto.js";

class LottoSystem {
  #lottoInstances;
  #lottoArr;
  constructor() {
    this.#lottoArr = [];
    this.#lottoInstances = [];
  }

  createLotto(amount) {
    const count = amount / LOTTO.PRICE;

    for (let i = 0; i < count; i++) {
      const randomNum = Random.pickUniqueNumbersInRange(
        LOTTO.RANGE.MIN,
        LOTTO.RANGE.MAX,
        LOTTO.COUNT
      );
      const sortedNum = randomNum.sort((a, b) => a - b);
      const lotto = new Lotto(sortedNum);

      this.#lottoArr.push(sortedNum);
      this.#lottoInstances.push(lotto);
    }
  }

  getLottoNum() {
    return this.#lottoArr;
  }

  match(winningNum, bonusNum) {
    for (const lotto of this.#lottoInstances) {
      const [match, isBonusMatch] = lotto.match(winningNum, bonusNum);

      if (match === LOTTO.MATCH.ZERO.NUMBER) result[LOTTO.MATCH.ZERO.RANK][1]++;
      if (match === LOTTO.MATCH.TWO_BONUS.NUMBER && isBonusMatch)
        result[LOTTO.MATCH.TWO_BONUS.RANK][1]++;
      if (match === LOTTO.MATCH.THREE_BONUS.NUMBER && isBonusMatch)
        result[LOTTO.MATCH.THREE_BONUS.RANK][1]++;
      if (match === LOTTO.MATCH.FOUR.NUMBER) result[LOTTO.MATCH.FOUR.RANK][1]++;
      if (match === LOTTO.MATCH.FOUR_BONUS.NUMBER && isBonusMatch)
        result[LOTTO.MATCH.FOUR_BONUS.RANK][1]++;
      if (match === LOTTO.MATCH.FIVE.NUMBER) result[LOTTO.MATCH.FIVE.RANK][1]++;
    }
  }

  getResult() {
    return new Map(result);
  }
}

const result = [
  [LOTTO.MATCH.ZERO.RANK, 0],
  [LOTTO.MATCH.FIVE.RANK, 0],
  [LOTTO.MATCH.FOUR_BONUS.RANK, 0],
  [LOTTO.MATCH.FOUR.RANK, 0],
  [LOTTO.MATCH.THREE_BONUS.RANK, 0],
  [LOTTO.MATCH.TWO_BONUS.RANK, 0],
];

export const lottoSystem = new LottoSystem();
