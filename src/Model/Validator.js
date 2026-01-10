import { ERROR, LOTTO } from "../../constants.js";

export const Validator = {
  //인자는 숫자
  amount(input) {
    const number = Number(input);
    if (Number.isNaN(number)) throw Error(ERROR);
    if (number % LOTTO.PRICE !== 0) throw Error(ERROR.NOT_DIVISIBLE);
    if (number < LOTTO.RANGE.MIN) throw Error(ERROR.NOT_POSITIVE);
  },

  winningNum() {},
  bonusNum() {},
};
