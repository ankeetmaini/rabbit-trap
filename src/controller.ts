export default class Controller {
  key: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | null;

  keyDownUp = (event: KeyboardEvent) => {
    const isDown = event.type === "keydown" ? true : false;
    if (!isDown) {
      this.key = null;
    }

    if (!isDown) return;
    switch (event.key) {
      case "ArrowUp": {
        this.key = "ArrowUp";
        break;
      }
      case "ArrowDown": {
        this.key = "ArrowDown";
        break;
      }
      case "ArrowLeft": {
        this.key = "ArrowLeft";
        break;
      }
      case "ArrowRight": {
        this.key = "ArrowRight";
        break;
      }
    }
  };
}
