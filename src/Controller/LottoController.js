import { lottoSystem } from "../Model/LottoSystem.js";
import { Validator } from "../Model/Validator.js";
import { InputView, OutputView } from "../view.js";
import { DarkOutputView } from "../View/DarkOutputView.js";

export const LottoController = {
  async start() {
    const amount = await this.getAmount();
    lottoSystem.createLotto(amount);
    OutputView.printPurchasedLottos(lottoSystem.getLottoNum());

    const winningNum = await this.getWinningNum();
    const bonusNum = await this.getBonusNum(winningNum);

    lottoSystem.match(winningNum, bonusNum);
    OutputView.printResult(lottoSystem.getResult());
    DarkOutputView.profit(lottoSystem.getProfitRate());
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

  async getWinningNum() {
    while (true) {
      try {
        const winningNum = await InputView.askWinningLotto();
        Validator.winningNum(winningNum);
        return winningNum;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  },

  async getBonusNum(winningNum) {
    while (true) {
      try {
        const bonusNum = await InputView.askBonusNumber();
        Validator.bonusNum(bonusNum, winningNum);
        return bonusNum;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  },
};
