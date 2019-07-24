export default class Game {
  color = "rgb(0,0,0)";
  colors = [0, 0, 0];
  shifts = [1, 1, 1];

  update = () => {
    for (let i = 0; i < 3; i++) {
      const color = this.colors[i];
      let shift = this.shifts[i];
      const total = color + shift;
      if (total > 255 || total < 0) {
        shift =
          shift < 0
            ? Math.floor(Math.random() * 2) + 1
            : Math.floor(Math.random() * -2) - 1;
      }

      // update instance vars
      this.colors[i] = shift + color;
      this.shifts[i] = shift;
      this.color = `rgb(${this.colors.join(",")})`;
    }
  };
}
