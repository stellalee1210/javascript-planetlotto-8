import { LottoController } from "./Controller/LottoController.js";

class App {
  async run() {
    await LottoController.start();
  }
}

export default App;
