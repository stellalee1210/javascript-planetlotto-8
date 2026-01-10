import { LottoController } from "./Controller/lottoController.js";

class App {
  async run() {
    await LottoController.start();
  }
}

export default App;
