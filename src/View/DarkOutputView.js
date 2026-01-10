import { MissionUtils } from "@woowacourse/mission-utils";
import { PROFIT } from "../constants.js";

export const DarkOutputView = {
  profit(msg) {
    MissionUtils.Console.print(`${PROFIT.MSG.START}${msg}${PROFIT.MSG.END}`);
  },
};
