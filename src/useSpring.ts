import {MutableRefObject, useRef} from "react";
import { updateFrameFromScene } from "./updateFrameFromScene";
import { interpolateWithSpring } from "./interpolator/interpolateWithSpring";
import {
  AnimationFrame,
  AnimationScene,
  Converter,
  InterpolatableAnimationFrame,
  RefFunction
} from "./AnimatedTypes";
import { applyFramePropertyToElementStyle } from "./applyFramePropertyToElementStyle";

export function useSpring(
  ref: any,
  convert: Converter,
  useRef: RefFunction<InterpolatableAnimationFrame>
): (scene: AnimationScene) => void {
  const internalFrame = useRef({});
  let isAnimating = false;

  function update(): void {
    // interpolate
    for (const key in internalFrame.current) {
      interpolateWithSpring(internalFrame.current[key]);
    }

    // create value for apply Animation Style
    const r: AnimationFrame = {};
    let isFinish = true;
    for (const [k, v] of Object.entries(internalFrame.current)) {
      r[k] = v.value;
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
    updateFrameFromScene(internalFrame.current, scene);
    if (!isAnimating) {
      window.requestAnimationFrame(update);
      isAnimating = true;
    }
  };
}
