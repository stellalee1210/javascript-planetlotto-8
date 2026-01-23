import { Random } from "@woowacourse/mission-utils";
import { LOTTO } from "../constants.js";
import { Lotto } from "./Lotto.js";

class LottoSystem {
  #lottoInstances;
  constructor() {
    this.#lottoInstances = [];
  }

  createLotto(amount) {
    const count = amount / LOTTO.PRICE.MIN;

    for (let i = 0; i < count; i++) {
      const randomNum = Random.pickUniqueNumbersInRange(
        LOTTO.RANGE.MIN,
        LOTTO.RANGE.MAX,
        LOTTO.COUNT,
      );
      const sortedNum = randomNum.sort((a, b) => a - b);

      const lotto = new Lotto(sortedNum);
      this.#lottoInstances.push(lotto);
    }
  }

  getLottoNum() {
    return this.#lottoInstances.map((lotto) => lotto.toString());
  }

  match(winningNum, bonusNum) {
    for (const lotto of this.#lottoInstances) {
      lotto.match(winningNum, bonusNum);
    }
  }

  getResult() {
    let result = Array.from({ length: 6 }, (_, i) => [i, 0]);

    this.#lottoInstances.forEach((lotto) => {
      const rank = lotto.result();
      result[rank][1]++;
    });

    return new Map(result);
  }

  getProfitRate() {
    // const totalExpense = this.#lottoInstances.length * LOTTO.PRICE.MIN;
    // let totalProfit = 0;
    // totalProfit += result[LOTTO.MATCH.ZERO.RANK][1] * LOTTO.MATCH.ZERO.PRIZE;
    // totalProfit +=
    //   result[LOTTO.MATCH.TWO_BONUS.RANK][1] * LOTTO.MATCH.TWO_BONUS.PRIZE;
    // totalProfit +=
    //   result[LOTTO.MATCH.THREE_BONUS.RANK][1] * LOTTO.MATCH.THREE_BONUS.PRIZE;
    // totalProfit += result[LOTTO.MATCH.FOUR.RANK][1] * LOTTO.MATCH.FOUR.PRIZE;
    // totalProfit +=
    //   result[LOTTO.MATCH.FOUR_BONUS.RANK][1] * LOTTO.MATCH.FOUR_BONUS.PRIZE;
    // totalProfit += result[LOTTO.MATCH.FIVE.RANK][1] * LOTTO.MATCH.FIVE.PRIZE;
    // return [
    //   totalProfit,
    //   Number(((totalProfit / totalExpense) * 100).toFixed(1)),
    // ];
  }
}

export const lottoSystem = new LottoSystem();
