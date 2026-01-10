import { MissionUtils } from "@woowacourse/mission-utils";

export const DarkInputView = {
  async option() {
    return await MissionUtils.Console.readLineAsync(
      "[ 어둠의 복권 상인 ]이 도박을 제안합니다. (y/n)\n"
    );
  },
  async guess() {
    return await MissionUtils.Console.readLineAsync(
      "\n[ 어둠의 복권 상인 ] : ...숫자를 하나 고르시오.\n"
    );
  },
};
