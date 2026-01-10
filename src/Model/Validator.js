import { ERROR, LOTTO } from "../../constants.js";

export const Validator = {
  //인자는 숫자
  amount(input) {
    const number = Number(input);
    if (Number.isNaN(number)) throw Error(ERROR);
    if (number % LOTTO.PRICE !== 0) throw Error(ERROR.NOT_DIVISIBLE);
    if (number < LOTTO.RANGE.MIN) throw Error(ERROR.NOT_POSITIVE);
  },

  //인자는 배열, 요소 숫자
  winningNum(input) {
    if (input.length !== LOTTO.COUNT)
      throw Error(ERROR.WINNING_COUNT_OUT_OF_RANGE);

    const set = new Set(input);
    if (set.size !== LOTTO.COUNT) throw Error(ERROR.WINNING_COUNT_OUT_OF_RANGE);

    for (const number of input) {
      if (number < LOTTO.RANGE.MIN || number > LOTTO.RANGE.MAX)
        throw Error(ERROR.NUMBER_OUT_OF_RANGE);
    }
  },

  //인자는 숫자
  bonusNum(input, winningNum) {
    if (input < LOTTO.RANGE.MIN || input > LOTTO.RANGE.MAX)
      throw Error(ERROR.NUMBER_OUT_OF_RANGE);

    if (winningNum.includes(input)) throw Error(ERROR.BONUS_DUPLICATE);
  },
};
