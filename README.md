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

> 복권의 수익률이 `1000%`를 넘길 시, 누군가가 찾아옵니다…

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
