import { StylableAnimationFrame } from './AnimatedTypes';

export function applyFramePropertyToElementStyle(
  style: StylableAnimationFrame,
  element: any
): void {
  for (let styleName in style) {
    element.style[styleName] = style[styleName];
  }
}
