import { updateFrameFromScene } from "./updateFrameFromScene";
import { interpolateWithSpring } from "./interpolator/interpolateWithSpring";
import { AnimationFrame, AnimationScene, Converter } from "./AnimatedTypes";
import { applyFramePropertyToElementStyle } from "./applyFramePropertyToElementStyle";

export function useSpring(
  ref: any,
  convert: Converter,
  useRef: any
): (scene: AnimationScene) => void {
  const internalFrame = useRef({});
  let isAnimating = false;

  function update(): void {
    const r: AnimationFrame = {};
    let isFinish = true;
    internalFrame.current.sceneKeys.forEach((key: any) => {
      interpolateWithSpring(internalFrame.current[key]);
      r[key] = internalFrame.current[key].value;
      if (internalFrame.current[key].done !== true) {
        isFinish = false;
      }
    });

    if (isFinish) {
      isAnimating = false;
    } else if (ref !== null) {
      applyFramePropertyToElementStyle(convert(r), ref.current);
      window.requestAnimationFrame(update);
    }
  }

  return (scene: AnimationScene): void => {
    updateFrameFromScene(internalFrame.current, scene);

    internalFrame.current.sceneKeys = internalFrame.current.sceneKeys
      ? [...internalFrame.current.sceneKeys, ...Object.keys(scene.to)]
      : Object.keys(scene.to);
    if (!isAnimating) {
      window.requestAnimationFrame(update);
      isAnimating = true;
    }
  };
}
