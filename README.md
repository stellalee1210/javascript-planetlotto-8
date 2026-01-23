## 행성 로또

우테코 로또 발매기인 행성 로또 프로그램.

## 설계

[설계 방향 및 의도]

<프로그램 순서>

**만약 에러 발생 시 해당 지점부터 다시 입력 받기**

구입 금액 입력 → 검증 → 구입 금액을 500으로 나누기 → 개수만큼 로또 자동 발행하기 → 당첨 번호 입력 받기 → 검증 → 보너스 번호 입력하기 → 검증 → 비교한 결과 출력

view 정리

InputView

- askAmount : 구입 금액 입력 기능, 미리 숫자를 검증하여 Number로 리턴. 에러 값 앞에 [ERROR] 부재
- askWinningLotto : 당첨번호 입력 기능, 미리 ‘,’으로 전부 split하고 숫자로 변형하여 리턴. 에러 값 앞에 [ERROR] 부재
- askBonusNumber : 보너스 번호 입력 기능, 미리 숫자를 검증하여 Number로 리턴. 에러 값 앞에 [ERROR] 부재

OutputView

- printPurchasedLottos : 자동 발행된 로또 출력. 인자로 2차원 배열을 받음.
- printResult : Map 형태로 인자를 받음. <등수, 개수>
  - 0번 : 미당첨
  - 1~5번 : 1~5등
- printErrorMessage : 에러 메세지 자체를 인자로 받고 출력

<테스트 기능>

ApplicationTest

- 기능 테스트 : 올바른 값을 넣고 작동하는 테스트
- 예외 테스트 : 구입 금액 입력 실수 → 검증 → 에러 메세지 출력 (console.print) → 재입력 받기

<구현 계획>

1. ~~Validator에 대한 단위 테스트 작성 (~13:30)~~
   - 구입 금액 : 500원 단위로 떨어지지 않는 수 / 음수 / 빈 값
   - 당첨 번호 : 5개를 충족하지 않는 번호 목록 / 목록 내에서 중복되는 수 / 범위를 넘어선 숫자
   - 보너스 번호 : 빈 값 /범위를 넘어선 숫자 / 당첨 번호와 중복되는 수
2. ~~올바르게 작동하는 기능 구현 (~15:00)~~
   1. 입출력 기능
   2. 로또 번호 자동 발행 후 저장
   3. 당첨 번호와 보너스 번호 비교
   4. 결과 출력 메세지 생성
3. ~~기본 테스트 통과 확인~~
4. ~~리드미 중간 작성(~15:30)~~
5. 도전 과제 (~17:00)

## 프로젝트 구조

```
📦src
 ┣ 📂Controller
 ┃ ┗ 📜LottoController.js
 ┣ 📂Model
 ┃ ┣ 📜Lotto.js
 ┃ ┣ 📜LottoSystem.js
 ┃ ┗ 📜Validator.js
 ┣ 📜App.js
 ┣ 📜index.js
 ┗ 📜view.js
```

## 기능 상세 설명 및 구현 기능 목록

### Model

LottoSystem (Class)

- lottoInstances : Lotto 객체 배열을 저장
- [x] createLotto : 로또 번호 자동 발행 로직
- [x] match : Lotto 객체의 match 메서드를 사용하여 당첨 여부를 판단 후 result 객체에 저장
- [x] getLottoNum()
- [x] getResult : 2차원 배열로 저장된 결과 값을 map 형태로 리턴

Lotto (Class)

- #number
- [x] match : 당첨 번호 / 보너스 번호와 비교하는 로직

Validator

- [x] buyingPrice : 구입 금액 검증 기능
  - [x] 500원 단위로 떨어지지 않는 수
  - [x] 0 또는 음수
- [x] winningNum : 당첨 번호 검증 기능
  - [x] 5개를 충족하지 않는 번호 목록
  - [x] 목록 내에서 중복되는 수
  - [x] 범위를 넘어선 숫자
- [x] bonusNum : 보너스 번호 검증 기능
  - [x] 범위를 넘어선 숫자
  - [x] 당첨 번호와 중복되는 수

### Controller

lottoController

- [x] 로또 구입 금액 입력 요청 & 검증
- [x] 로또 구입 금액만큼 자동 발행 요청
  - [x] 자동 발행한 로또 출력 요청
- [x] 당첨 번호 입력 요청 & 검증
- [x] 보너스 번호 입력 요청 & 검증
- [x] LottoSystem에 비교 과정 진행 요청
- [x] 결과 메세지 요청 → 출력

### constants.js

LOTTO

```bash
PRICE: 500,
  COUNT: 5,
  RANGE: { MIN: 1, MAX: 30 },
  MATCH: {
    ZERO: { RANK: 0, NUMBER: 0, PRIZE: 0 },
    TWO_BONUS: { RANK: 5, NUMBER: 2, PRIZE: 5000 },
    THREE_BONUS: { RANK: 4, NUMBER: 3, PRIZE: 500000 },
    FOUR: { RANK: 3, NUMBER: 4, PRIZE: 1500000 },
    FOUR_BONUS: { RANK: 2, NUMBER: 4, PRIZE: 10000000 },
    FIVE: { RANK: 1, NUMBER: 5, PRIZE: 100000000 },
  },
```

ERROR

- [x] NAN: "구매금액은 숫자여야 합니다."
- [x] NOT_POSITIVE: "0 또는 음수는 입력할 수 없습니다."
- [x] NOT_DIVISIBLE: "500원으로 나눌 수 없습니다."
- [x] WINNING_COUNT_OUT_OF_RANGE: "당첨 번호는 오직 5개만 입력이 가능합니다."
- [x] WINNING_NUM_SAME: "같은 값은 입력할 수 없습니다."
- [x] NUMBER_OUT_OF_RANGE: "1~30사이의 중복되지 않은 값만 입력이 가능합니다."
- [x] BONUS_DUPLICATE: "당첨 번호와 중복되지 않는 보너스 번호를 입력해주세요."

## Test

- [x] 기본 테스트 통과

### 추가한 테스트

Validator 테스트

- [x] amount: 구입 금액 검증 기능
  - [x] 500원 단위로 떨어지지 않는 수
  - [x] 음수
- [x] winningNum : 당첨 번호 검증 기능
  - [x] 5개를 충족하지 않는 번호 목록
  - [x] 목록 내에서 중복되는 수
  - [x] 범위를 넘어선 숫자
- [x] bonusNum : 보너스 번호 검증 기능
  - [x] 범위를 넘어선 숫자
  - [x] 당첨 번호와 중복되는 수

---

## 도전 과제 : 기능 확장

### <어둠의 복권 상인>

> 사람들이 복권을 많이 사게 되자 정부에서 복권의 무분별한 구매를 막기 위해 금액 한도를 50,000원으로 제한했습니다. 이에 불만을 가진 사람들이 많아지자, 사람들을 어둠의 길로 빠지게 만드는 ??가 등장했습니다.
> 그는 누군가의 복권의 수익률이 `1000%`를 넘길 시, 찾아옵니다…

### 프로그램 설명

- 복권 구매 금액에 제한이 생겼습니다. 50,000원 이상을 구매할 시 Error가 발생하고 다시 입력을 받습니다.
- 로또 당첨 통계 출력 이후 현재 수익률을 계산하여 출력합니다.
  - `현재 수익률 : `nn%`
- 만약 수익률이 1000%를 넘길 시에 어둠의 복권 상인이 등장합니다.

  ```bash
  ...

  누군가가 도착했다.

  ...

  [ 어둠의 복권 상인 ]이 도박을 제안합니다.
  ```

- 복권 상인이 1부터 5 사이의 숫자를 하나 뽑습니다.
- 사용자는 1부터 30 사이의 숫자를 하나 고릅니다.
- 만약 사용자가 고른 숫자가 복권 상인이 고른 수의 배수라면 복권 상인이 상금을 2배로 돌려주고 사라집니다.
  - 만약 아닐 시, 복권 상인이 모든 상금을 회수하고 사라집니다.

### 기능 구현 목록 및 기능 상세 설명

### Validator

- [x] amount : 50,000원을 넘을 시 에러를 발생시킨다.

### View

DarkInputView

- [x] option : 사용자의 도박 여부를 입력한다
- [x] guess : 사용자의 답을 입력 받는다

DarkOutputView

- [x] appear : 어둠의 복권 상인 등장 메세지 출력
- [x] disappear: 어둠의 복권 상인 퇴장 메세지 출력
- [x] give : 사용자에게 상금 부여합니다.
- [x] result : 정답의 여부와 상금을 출력합니다
- [x] take : 사용자의 상금을 모두 가져갑니다.
- [x] profit : 현재 총 수익률을 출력합니다.

### Model

- [x] DarkLotto
  - [x] pickRandom : 어둠상인이 랜덤으로 숫자를 하나 고른다
  - [x] isMatch: 어둠 상인의 숫자와 사용자의 숫자를 비교하여 답을 확인한다

- [x] LottoSystem
  - [x] getProfitRate(): 수익률을 계산한다.

### constants

- [x] ERROR
  - [x] BUY_LIMIT: "로또는 500원 이상 50,000원 이하로 구매 가능합니다.”
- [x] PROFIT

```
MSG: { START: "현재 수익률은 : ", END: "%입니다.\n" },
  APPEAR_RATE: 1000,
```

---

## 리팩토링 - 최종테스트 이후

### 1. LottoSystem.js의 getLottoNum() 메소드

- 기존 코드 : 현재의 getLottoNum 메소드는 getter 메소드다. getter 메소드는 필드를 바로 받는다는 점에서 편리하긴 하지만, 해당 메소드가 리턴하는 값은 배열이고, 배열은 참조 타입이기에 외부에서 push, pop으로 변경이 가능하다. 따라서 불변성 / 보안 문제 때문에 최대한 사용하지 않으려고 했으나, 시험 칠 때는 로직 변경을 어떻게 해야 할 지 몰라서 그냥 사용했다.

  ```jsx
  class LottoSystem {
  	constructor() {
  	    this.#lottoArr = [];
  	    this.#lottoInstances = [];
  	  }

  	  createLotto(amount) {
  	    const count = amount / LOTTO.PRICE.MIN;

  	    for (let i = 0; i < count; i++) {
  	      const randomNum = Random.pickUniqueNumbersInRange(
  	        LOTTO.RANGE.MIN,
  	        LOTTO.RANGE.MAX,
  	        LOTTO.COUNT
  	      );
  	      const sortedNum = randomNum.sort((a, b) => a - b);
  	      const lotto = new Lotto(sortedNum);

  	      this.#lottoArr.push(sortedNum); //생성한 로또 번호를 필드에 바로 저장
  	      this.#lottoInstances.push(lotto);
  	    }
  	  }

  	getLottoNum() {
  	    return this.#lottoArr; // 필드를 바로 참조하여 return
  	  }

  	  ...
    }
  ```

- 변경한 코드 : 처음에는 getter 함수를 아예 사용하지 않는 방향으로 리팩토링 하려고 했으나, 그렇게 되면 쉬운 길을 돌아가는 것 같았다. 그래서 해당 필드의 불변성을 해치지 않는 방법이면 괜찮을 것 같다고 판단하여 전개 연산자로 필드의 복사본을 리턴하는 방식을 생각했다. 근데 리턴하는 값이 2차원 배열이다 보니 해당 배열을 복사 하더라도, 내부 값은 여전히 원본을 참조하기에 불변성을 해치게 된다. 고민 끝에 lottoArr 필드를 삭제하고 lottoInstances를 map으로 돌면서 Lotto 객체에서 랜덤 숫자 배열의 복사본을 가져오는 getter 함수를 만들어서 활용하는 방법을 채택하기로 했다. 그렇게 하게 되면, 원본 값이 지켜지기 때문에 한 단계 돌아가는 것 같아도 안전하기 때문에 괜찮다고 생각했다.

```jsx
export class Lotto {
  #numbers;
  constructor(numbers) {
    this.#numbers = numbers;
  }

  toString() {
    return [...this.#numbers];
  }

  ...

 }
```

```jsx
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
        LOTTO.COUNT
      );
      const sortedNum = randomNum.sort((a, b) => a - b);

      const lotto = new Lotto(sortedNum);
      this.#lottoInstances.push(lotto);
    }
  }

  getLottoNum() {
    return this.#lottoInstances.map((lotto) => lotto.toString());
  }

	...

}
```

### 2. LottoSystem.js의 결과 저장 로직

- 기존 코드 : 결과 데이터에 대한 분리가 하고 싶어서 class 외부에 result를 배열로 선언하여 사용했는데, 다시 생각해보니 결과 값이 무방비 상태로 주어져 있어 적절하지 못한 코드라고 생각됐다. 또한, 로또 관련 상수명들이 너무 길어 가독성을 해치고 있다고 생각해 `LOTTO` 상수와 `match`, `getResult` 메소드를 리팩토링 하기로 했다. `match` 메소드는 현재 `Lotto` 클래스의 match 메소드를 통해 당첨 번호와 보너스 번호의 당첨 여부를 계산하는데 결과를 저장하는 로직은 `LottoSystem`에 있다. 따라서 `Lotto`의 match 메소드 내부에서 맞은 개수를 계산한 뒤 바로 저장까지 하게 리팩토링 하고, `LottoSystem`에서는 lottoInstance 필드를 통해서만 로또 관련 연산을 하도록 요청하게 분리를 시키려고 한다.

  ```jsx
  export const LOTTO = Object.freeze({
    PRICE: {
      MIN: 500,
      MAX: 50000,
    },
    COUNT: 5,
    RANGE: { MIN: 1, MAX: 30 },
    MATCH: {
      ZERO: { RANK: 0, NUMBER: 0, PRIZE: 0 },
      TWO_BONUS: { RANK: 5, NUMBER: 2, PRIZE: 5000 },
      THREE_BONUS: { RANK: 4, NUMBER: 3, PRIZE: 500000 },
      FOUR: { RANK: 3, NUMBER: 4, PRIZE: 1500000 },
      FOUR_BONUS: { RANK: 2, NUMBER: 4, PRIZE: 10000000 },
      FIVE: { RANK: 1, NUMBER: 5, PRIZE: 100000000 },
    },
  });
  ```

  ```jsx
  class LottoSystem {

  	...


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

   ...

  }

  const result = [
    [LOTTO.MATCH.ZERO.RANK, 0],
    [LOTTO.MATCH.FIVE.RANK, 0],
    [LOTTO.MATCH.FOUR_BONUS.RANK, 0],
    [LOTTO.MATCH.FOUR.RANK, 0],
    [LOTTO.MATCH.THREE_BONUS.RANK, 0],
    [LOTTO.MATCH.TWO_BONUS.RANK, 0],
  ];
  ```

- 변경한 코드 : 기존 `LOTTO` 상수의 `MATCH` 항목이 가독성이 떨어져 key를 ‘맞춘 숫자’로 변경했다. 그리고 `Lotto` 클래스에 해당 번호의 순위를 저장할 수 있게 `rank` 필드를 만들어 내부에 저장하는 로직을 만들었다. `LottoSystem` 의 match와 getResult 메소드는 각각 반복문을 통해 `lottoInstance`필드의 내부 요소를 돌며 계산을 `Lotto` 클래스에게 넘기는 방식으로 바꿨다. 전보다 길이가 짧아지고 역할 분리가 명확해졌다.

  ```jsx
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
  ```

  ```jsx
  class LottoSystem {

  	...

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

  	...

  }
  ```

  ```jsx
  class Lotto {

  	...

  	#save(match, isBonusMatch) {
      if (match === LOTTO.MATCH[4].NUMBER && isBonusMatch) {
        this.#rank = LOTTO.MATCH[4].BONUS.RANK;
        return;
      }

      this.#rank = LOTTO.MATCH[match].RANK;
    }

    result() {
      const copy = this.#rank;
      return copy;
    }

    ...

  }
  ```

### 3. LottoSystem.js의 getProfitRate 메소드 수익률 계산 로직

- 기존 코드 : 기존에는 외부에 선언된 `result` 배열에 `LOTTO` 상수명을 활용하여 일일히 모든 경우의 수에 대한 계산을 처리했었다. 매우 비효율적이였고, 가독성도 떨어졌다.

```jsx
class LottoSystem {

	...

	getProfitRate() {
    const totalExpense = this.#lottoInstances.length * LOTTO.PRICE.MIN;
    let totalProfit = 0;

    totalProfit += result[LOTTO.MATCH.ZERO.RANK][1] * LOTTO.MATCH.ZERO.PRIZE;
    totalProfit +=
      result[LOTTO.MATCH.TWO_BONUS.RANK][1] * LOTTO.MATCH.TWO_BONUS.PRIZE;
    totalProfit +=
      result[LOTTO.MATCH.THREE_BONUS.RANK][1] * LOTTO.MATCH.THREE_BONUS.PRIZE;
    totalProfit += result[LOTTO.MATCH.FOUR.RANK][1] * LOTTO.MATCH.FOUR.PRIZE;
    totalProfit +=
      result[LOTTO.MATCH.FOUR_BONUS.RANK][1] * LOTTO.MATCH.FOUR_BONUS.PRIZE;
    totalProfit += result[LOTTO.MATCH.FIVE.RANK][1] * LOTTO.MATCH.FIVE.PRIZE;

    return [
      totalProfit,
      Number(((totalProfit / totalExpense) * 100).toFixed(1)),
    ];
  }

  ...

}
```

- 변경한 코드 : `LOTTO` 상수에 있던 불필요한 요소 (NUMBER)를 삭제하고 순위 정보와 상금 정보를 `RANK_PRICE`라는 상수로 분리했다. 그리고 수익률을 계산할 때 한 번 더 사용할 수 있게 LottoSystem 내부에 result 필드를 만들어 순위를 계산할 때 저장하게 했다.

```jsx
export const LOTTO = Object.freeze({
  PRICE: {
    MIN: 500,
    MAX: 50000,
  },
  COUNT: 5,
  RANGE: { MIN: 1, MAX: 30 },
  MATCH: {
    0: { RANK: 0 },
    1: { RANK: 0 },
    2: { RANK: 5 },
    3: { RANK: 4 },
    4: { RANK: 3, BONUS: { RANK: 2 } },
    5: { RANK: 1 },
  },
});

export const RANK_PRICE = Object.freeze({
  0: 0,
  1: 100000000,
  2: 10000000,
  3: 1500000,
  4: 500000,
  5: 5000,
});
```

```jsx
class LottoSystem {
  #lottoInstances;
  #result;
  constructor() {
    this.#lottoInstances = [];
    this.#result = Array.from({ length: 6 }, (_, i) => [i, 0]);
  }

	...

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

```
