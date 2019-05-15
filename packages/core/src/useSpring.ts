import { updateFrameFromScene } from "./updateFrameFromScene";
import { interpolateWithSpring } from "./interpolator/interpolateWithSpring";
import {
  AnimationFrame,
  AnimationScene,
  Converter,
  InterpolatableAnimationFrame,
} from "./AnimatedTypes";
import { applyFramePropertyToElementStyle } from "./applyFramePropertyToElementStyle";

export function useSpring(
  ref: any,
  convert: Converter
): (scene: AnimationScene) => void {
  const internalFrame: InterpolatableAnimationFrame = {};
  let isAnimating = false;

  function update(): void {
    // interpolate
    for (const key in internalFrame) {
      interpolateWithSpring(internalFrame[key]);
    }

    // create value for apply Animation Style
    const r: AnimationFrame = {};
    let isFinish = true;
    for (const [k, v] of Object.entries(internalFrame)) {
      // @ts-ignore
      r[k] = v.value;
      // @ts-ignore
      if (v.done !== true) isFinish = false;
    }

    if (isFinish) {
      isAnimating = false;
    } else if (ref !== null) {
      applyFramePropertyToElementStyle(convert(r), ref.current);
      window.requestAnimationFrame(update);
    }
  }

  return (scene: AnimationScene): void => {
    updateFrameFromScene(internalFrame, scene);
    if (!isAnimating) {
      window.requestAnimationFrame(update);
      isAnimating = true;
    }
  };
}
