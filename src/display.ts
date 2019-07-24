export default class Display {
  buffer = document.createElement("canvas").getContext("2d");
  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
  }

  renderColor = (color: string) => {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  };

  render = () => {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  };

  resize = () => {
    const newWidth = document.documentElement.clientWidth;
    const newHeight = document.documentElement.clientHeight;
    this.buffer.canvas.width = newWidth;
    this.buffer.canvas.height = newHeight;
    this.context.canvas.width = newWidth;
    this.context.canvas.height = newHeight;

    this.render();
  };
}
