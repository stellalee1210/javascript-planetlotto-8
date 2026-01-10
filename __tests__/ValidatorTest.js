import { Validator } from "../src/Model/Validator.js"; // 경로 주의!

describe("Validator - 구입금액 검증 기능 단위 테스트", () => {
  test("빈 입력 값", () => {
    const input = "";

    expect(() => {
      Validator.amount(input);
    }).toThrow("[ERROR]");
  });

  test("500원 단위로 떨어지지 않는 수", () => {
    const input = "1300";

    expect(() => {
      Validator.amount(input);
    }).toThrow("[ERROR]");
  });

  test("음수", () => {
    const input = "-500";

    expect(() => {
      Validator.amount(input);
    }).toThrow("[ERROR]");
  });
});

describe("Validator - 당첨 번호 검증 기능 단위 테스트", () => {
  test("번호가 5개 미만으로 입력", () => {
    const input = "1,2,3,4";

    expect(() => {
      Validator.winningNum(input);
    }).toThrow("[ERROR]");
  });

  test("중복되는 번호", () => {
    const input = "1,2,3,3,5";

    expect(() => {
      Validator.winningNum(input);
    }).toThrow("[ERROR]");
  });

  test("1~30 사이의 범위를 벗어난 숫자", () => {
    const input = "27,28,29,30,31";

    expect(() => {
      Validator.winningNum(input);
    }).toThrow("[ERROR]");
  });
});

describe("Validator - 보너스 번호 검증 기능 단위 테스트", () => {
  test("빈 값", () => {
    const winningNum = "1,2,3,4,5";
    const input = "";

    expect(() => {
      Validator.bonusNum(winningNum, input);
    }).toThrow("[ERROR]");
  });

  test("1~30 사이의 숫자가 아닌 값", () => {
    const winningNum = "1,2,3,4,5";
    const input = "35";

    expect(() => {
      Validator.bonusNum(winningNum, input);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호와 중복되는 수", () => {
    const winningNum = "1,2,3,4,5";
    const input = "5";

    expect(() => {
      Validator.bonusNum(winningNum, input);
    }).toThrow("[ERROR]");
  });
});
