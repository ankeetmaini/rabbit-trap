type Fn = (args: number) => void;

export default class Engine {
  accumulatedTime = 0;
  animationFrameRequest: number;
  time: number; //most recent timestamp of loop execution
  framesPerSec: number;

  updated = false;
  update: Fn;
  render: Fn;

  constructor(framesPerSec: number, update: Fn, render: Fn) {
    this.framesPerSec = framesPerSec;
    this.update = update;
    this.render = render;
  }

  run = (timeStamp: number) => {
    this.accumulatedTime += timeStamp - this.time;
    this.time = timeStamp;

    /* If the device is too slow, updates may take longer than our time step. If
    this is the case, it could freeze the game and overload the cpu. To prevent this,
    we catch a memory spiral early and never allow three full frames to pass without
    an update. This is not ideal, but at least the user won't crash their cpu. */
    if (this.accumulatedTime >= this.framesPerSec * 3) {
      this.accumulatedTime = this.framesPerSec;
    }

    /* Since we can only update when the screen is ready to draw and requestAnimationFrame
    calls the run function, we need to keep track of how much time has passed. We
    store that accumulated time and test to see if enough has passed to justify
    an update. Remember, we want to update every time we have accumulated one time step's
    worth of time, and if multiple time steps have accumulated, we must update one
    time for each of them to stay up to speed. */
    while (this.accumulatedTime >= this.framesPerSec) {
      this.accumulatedTime -= this.framesPerSec;

      this.update(timeStamp);

      this.updated = true; // If the game has updated, we need to draw it again.
    }

    /* This allows us to only draw when the game has updated. */
    if (this.updated) {
      this.updated = false;
      this.render(timeStamp);
    }

    this.animationFrameRequest = window.requestAnimationFrame(this.run);
  };

  start = () => {
    this.accumulatedTime = this.framesPerSec;
    this.time = window.performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(this.run);
  };

  stop = () => window.cancelAnimationFrame(this.animationFrameRequest);
}
