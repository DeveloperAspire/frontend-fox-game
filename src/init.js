import game, { handlerUserAction } from "./gameState";
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";

async function init() {
  console.log("Starting Game");
  initButtons(handlerUserAction);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  requestAnimationFrame(nextAnimationFrame);
}

init();
