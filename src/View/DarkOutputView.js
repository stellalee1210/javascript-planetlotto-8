import { MissionUtils } from "@woowacourse/mission-utils";
import { PROFIT } from "../constants.js";

export const DarkOutputView = {
  profit(msg) {
    MissionUtils.Console.print(`${PROFIT.MSG.START}${msg}${PROFIT.MSG.END}`);
  },

  appear() {
    MissionUtils.Console.print("\n...\n누군가가 도착했다.\n...\n");
  },
  give(profit) {
    MissionUtils.Console.print("[ 어둠의 복권 상인 ] 대담한 영혼이군...\n");
    MissionUtils.Console.print(
      `[ 어둠의 복권 상인 ]에게서 총 ${profit * 2}원을 받았다!`
    );
  },
  take() {
    MissionUtils.Console.print(
      "\n[ 어둠의 복권 상인 ] 켈켈켈 인간은 언제나 욕심이 많은 법이지..."
    );
    MissionUtils.Console.print(
      "[ 어둠의 복권 상인 ]에게 모든 상금을 뺏겼습니다!"
    );
  },
  disappear() {
    MissionUtils.Console.print("\n드리웠던 그림자가 서서히 사라집니다...");
  },
};
