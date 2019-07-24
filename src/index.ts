import Controller from "./controller";
import Display from "./display";
import Game from "./game";
import Engine from "./engine";

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;

const controller = new Controller();
const display = new Display(canvas);
const game = new Game();
const engine = new Engine(
  1000 / 30,
  () => {
    display.renderColor(game.color);
    display.render();
  },
  () => {
    game.update();
  }
);

window.addEventListener("resize", display.resize);
window.addEventListener("keydown", controller.keyDownUp);
window.addEventListener("keyup", controller.keyDownUp);
display.resize();
engine.start();
