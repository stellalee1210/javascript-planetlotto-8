import { darkLotto } from "../Model/DarkLotto.js";
import { DarkInputView } from "../View/DarkInputView.js";
import { DarkOutputView } from "../View/DarkOutputView.js";

export const DarkLottoController = {
  async process(profit) {
    DarkOutputView.appear();
    const answer = await DarkInputView.option();
    if (answer === "y") this.start(profit);
    if (answer === "n") DarkOutputView.disappear();
  },
  async start(profit) {
    const guess = await DarkInputView.guess();
    if (darkLotto.isMatch(guess)) {
      DarkOutputView.profit(profit);
      DarkOutputView.disappear();
      return;
    }
    DarkOutputView.take();
    DarkOutputView.disappear();
  },
};
