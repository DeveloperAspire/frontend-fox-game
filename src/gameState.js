const gameState = {
  current: "INIT",
  clock: 1,
  tick() {
    this.clock++;
    console.log("Clock", this.clock);
    return this.clock;
  },
  handlerUserAction(icon) {
    console.log(icon);
  },
};

export default gameState;
