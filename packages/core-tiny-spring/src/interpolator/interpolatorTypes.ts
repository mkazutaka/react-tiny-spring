export type Interpolator = (
  property: InterpolatorProperty,
  config: InterpolatorConfig,
  timer: AnimatedTimer
) => void;

export interface InterpolatorProperty {
  value: number;
  velocity: number;
  lastTime: number;
  startTime: number;
  to: number;
  from: number;
  done: boolean;
}

export interface InterpolatorConfig {
  tension: number;
  friction: number;
  mass: number;
  initialVelocity: number;
  clamp: boolean;
  precision: number;
}

export type AnimatedTimer = () => number;
