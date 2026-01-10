import { lottoSystem } from "../Model/LottoSystem.js";
import { Validator } from "../Model/Validator.js";
import { InputView, OutputView } from "../view.js";

export const LottoController = {
  async start() {
    const amount = await this.getAmount();
    lottoSystem.createLotto(amount);
  },

  async getAmount() {
    while (true) {
      try {
        const amount = await InputView.askAmount();
        Validator.amount(amount);
        return amount;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  },
};
