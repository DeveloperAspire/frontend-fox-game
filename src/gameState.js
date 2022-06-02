import { modifyFox, modifyScene } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  getNextPoopTime,
} from "./constants";

const statesOfFox = ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"];

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  tick() {
    this.clock++;
    console.log("Clock", this.clock);

    if (this.clock === this.wakeTime) {
      console.log(this.wakeTime);
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    }
    return this.clock;
  },
  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modifyFox("egg");
    modifyScene("day");
  },
  wake() {
    this.current = "IDLING";
    this.wakeTime = -1;
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modifyScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);

    this.determineFoxState();
  },
  sleep() {
    this.state = "SLEEP";
    modifyFox("sleep");
    modifyScene("night");
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modifyFox("hungry");
  },
  die() {
    console.log("Die");
  },
  startCelebrating() {
    this.current = "CELEBRATING";
    modifyFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
  },
  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modifyFox("rain");
      } else {
        modifyFox("idling");
      }
    }
  },
  handlerUserAction(icon) {
    if (statesOfFox.includes(this.current)) {
      // DO NOTHING
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },

  changeWeather() {
    console.log("Change Weather");
  },
  cleanUpPoop() {
    console.log("Clean Up Poop");
  },
  feed() {
    if (this.current !== "HUNGRY") {
      return;
    }
    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modifyFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },
};

export const handlerUserAction = gameState.handlerUserAction.bind(gameState);
export default gameState;
