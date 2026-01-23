export const PROFIT = Object.freeze({
  MSG: { START: "현재 수익률은 : ", END: "%입니다.\n" },
  APPEAR_RATE: 1000,
});

export const LOTTO = Object.freeze({
  PRICE: {
    MIN: 500,
    MAX: 50000,
  },
  COUNT: 5,
  RANGE: { MIN: 1, MAX: 30 },
  MATCH: {
    0: { RANK: 0, NUMBER: 0, PRIZE: 0 },
    1: { RANK: 0, NUMBER: 0, PRIZE: 0 },
    2: { RANK: 5, NUMBER: 2, PRIZE: 5000 },
    3: { RANK: 4, NUMBER: 3, PRIZE: 500000 },
    4: {
      RANK: 3,
      NUMBER: 4,
      PRIZE: 1500000,
      BONUS: { RANK: 2, NUMBER: 4, PRIZE: 10000000 },
    },
    5: { RANK: 1, NUMBER: 5, PRIZE: 100000000 },
  },
});

export const ERROR = Object.freeze({
  BUY_LIMIT: "로또는 500원 이상 50,000원 이하로 구매 가능합니다.",
  NAN: "구매금액은 숫자여야 합니다.",
  NOT_POSITIVE: "0 또는 음수는 입력할 수 없습니다.",
  NOT_DIVISIBLE: "500원으로 나눌 수 없습니다.",
  WINNING_COUNT_OUT_OF_RANGE: "당첨 번호는 오직 5개만 입력이 가능합니다.",
  WINNING_NUM_SAME: "같은 값은 입력할 수 없습니다.",
  NUMBER_OUT_OF_RANGE: "1~30사이의 중복되지 않은 값만 입력이 가능합니다.",
  BONUS_DUPLICATE: "당첨 번호와 중복되지 않는 보너스 번호를 입력해주세요.",
});
