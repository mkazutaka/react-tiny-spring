import { AnimationScene, InterpolatableAnimationFrame } from "./AnimatedTypes";

type Now = () => number;

/**
 * Update frame from AnimationScene value
 *
 * @param frame
 * @param scene
 * @param now
 */
export function updateFrameFromScene(
  frame: InterpolatableAnimationFrame,
  scene: AnimationScene,
  now: Now = () => Date.now()
): void {
  for (const key in scene.to) {
    frame[key] = {
      value:
        scene.from && scene.from[key] !== undefined
          ? scene.from[key]
          : frame[key]
          ? frame[key].value
          : 0,
      velocity: frame[key] ? frame[key].velocity : 0,
      startTime: frame[key] ? frame[key].startTime : now(),
      lastTime: frame[key] ? frame[key].lastTime : now(),
      to: scene.to[key],
      from: scene.from && scene.from[key] ? scene.from[key] : 0,
      done: false
    };
  }
}
