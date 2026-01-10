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
}

export const lottoSystem = new LottoSystem();
