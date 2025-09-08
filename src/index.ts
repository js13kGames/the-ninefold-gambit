import { drawEngine } from './core/draw-engine';
import { MenuState } from './game-states/menu.state';
import { gameState } from './game-states/game.state';
import { createGameStateMachine, gameStateMachine } from './core/game-state-machine';
import { controls } from '@/core/controls';
import { time } from './core/time';
import { gamerEndState } from './game-states/game-end.state';


// const menuState = new MenuState();
// createGameStateMachine(menuState);
createGameStateMachine(gameState);
// createGameStateMachine(gamerEndState);


time.reset(performance.now());
(function draw(currentTime: number) {
  time.update(currentTime);

  if (!time.isPaused && time.delta > 0) {
    controls.queryController();

    drawEngine.context.clearRect(0, 0, drawEngine.canvasWidth, drawEngine.canvasHeight);
    gameStateMachine.getState().onUpdate(time.delta);
  }

  if (time.isPaused) {
    drawPauseOverlay(); // optional: render "Game Paused" text
  }
  // console.log("Game Elapsed Time: " + time.elapsed)
  requestAnimationFrame(draw);
})(performance.now());

function drawPauseOverlay() {
  // drawEngine.context.save();
  // // drawEngine.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  // // drawEngine.context.fillRect(0, 0, drawEngine.canvasWidth, drawEngine.canvasHeight);
  // // drawEngine.context.fillStyle = 'white';
  // // drawEngine.context.font = '32px Arial';
  // // drawEngine.context.textAlign = 'center';
  // // drawEngine.context.fillText('Game Paused', drawEngine.canvasWidth / 2, drawEngine.canvasHeight / 2);
  // drawEngine.context.fillStyle = '#282328d7'
  // drawEngine.context.strokeStyle = '#a3a29a'
  // drawEngine.context.lineWidth = 2
  // drawEngine.context.fillRect(drawEngine.canvasWidth / 2 - 80, drawEngine.canvasHeight/2 - 40, drawEngine.canvasWidth - 150, 75)
  // drawEngine.context.strokeRect(drawEngine.canvasWidth / 2 - 80, drawEngine.canvasHeight/2 - 40, drawEngine.canvasWidth - 150, 75)

  // drawEngine.context.font = '20px monospace'
  // drawEngine.context.fillStyle = 'lightgray'
  // drawEngine.context.fillText('Game Paused [p]', drawEngine.canvasWidth / 2 - 55, drawEngine.canvasHeight/2)
  // drawEngine.context.restore();
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'p' || e.key === 'P') {
    if (time.isPaused) {
      time.resume();
      // time.reset(performance.now()); // prevents delta spike after pause
    } else {
      time.pause();
    }
  }
});
// let previousTime = 0;
// const interval = 1000 / 60;

// (function draw(currentTime: number) {
//   const delta = currentTime - previousTime;

//   if (delta >= interval) {
//     previousTime = currentTime - (delta % interval);

//     controls.queryController();
//     // screenShake.update(delta);
//     drawEngine.context.clearRect(0, 0, drawEngine.canvasWidth, drawEngine.canvasHeight);
    
//     gameStateMachine.getState().onUpdate(delta);

//   }
//   requestAnimationFrame(draw);
// })(0);
