import { Random } from "@woowacourse/mission-utils";
import { LOTTO, RANK_PRICE } from "../constants.js";
import { Lotto } from "./Lotto.js";

class LottoSystem {
  #lottoInstances;
  #result;
  constructor() {
    this.#lottoInstances = [];
    this.#result = Array.from({ length: 6 }, (_, i) => [i, 0]);
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
    this.#lottoInstances.forEach((lotto) => {
      const rank = lotto.result();
      this.#result[rank][1]++;
    });

    return new Map(this.#result);
  }

  getProfitRate() {
    const totalExpense = this.#lottoInstances.length * LOTTO.PRICE.MIN;
    let totalProfit = 0;
    this.#result.map(
      (rank) => (totalProfit += rank[1] * RANK_PRICE[rank[[0]]]),
    );
    return [
      totalProfit,
      Number(((totalProfit / totalExpense) * 100).toFixed(1)),
    ];
  }
}

export const lottoSystem = new LottoSystem();
