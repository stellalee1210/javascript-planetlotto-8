export const LOTTO = Object.freeze({
  PRICE: 500,
  COUNT: 5,
  RANGE: { MIN: 1, MAX: 30 },
  MATCH: {
    ZERO: { RANK: 0, NUMBER: 0 },
    TWO_BONUS: { RANK: 5, NUMBER: 2 },
    THREE_BONUS: { RANK: 4, NUMBER: 3 },
    FOUR: { RANK: 3, NUMBER: 4 },
    FOUR_BONUS: { RANK: 2, NUMBER: 4 },
    FIVE: { RANK: 1, NUMBER: 5 },
  },
});

export const ERROR = Object.freeze({
  NAN: "구매금액은 숫자여야 합니다.",
  NOT_POSITIVE: "0 또는 음수는 입력할 수 없습니다.",
  NOT_DIVISIBLE: "500원으로 나눌 수 없습니다.",
  WINNING_COUNT_OUT_OF_RANGE: "당첨 번호는 오직 5개만 입력이 가능합니다.",
  WINNING_NUM_SAME: "같은 값은 입력할 수 없습니다.",
  NUMBER_OUT_OF_RANGE: "1~30사이의 중복되지 않은 값만 입력이 가능합니다.",
  BONUS_DUPLICATE: "당첨 번호와 중복되지 않는 보너스 번호를 입력해주세요.",
});
