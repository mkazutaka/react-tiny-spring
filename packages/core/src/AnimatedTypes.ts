import { InterpolatorProperty } from "./interpolator/interpolatorTypes";

export interface AnimationScene {
  from?: AnimationFrame;
  to: AnimationFrame;
}

export interface AnimationFrame {
  [key: string]: number;
}

export interface InterpolatableAnimationFrame {
  [key: string]: InterpolatorProperty;
}

export interface StylableAnimationFrame {
  [key: string]: string;
}

export type Converter = (v: AnimationFrame) => StylableAnimationFrame;
