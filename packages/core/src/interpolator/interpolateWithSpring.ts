import {
  InterpolatorConfig,
  InterpolatorProperty,
  AnimatedTimer
} from "./interpolatorTypes";
import {
  defaultAnimationConfig,
  defaultTimer
} from "./interpolatorDefaultValues";

export function interpolateWithSpring(
  property: InterpolatorProperty,
  config: InterpolatorConfig = defaultAnimationConfig,
  now: AnimatedTimer = defaultTimer
): void {
  const time = now();

  let position = property.value;
  let lastTime = property.lastTime !== 0 ? property.lastTime : time;
  let velocity =
    property.velocity !== 0 ? property.velocity : config.initialVelocity;
  let to = property.to;

  // If we lost a lot of frames just jump to the end.
  if (time > lastTime + 64) lastTime = time;
  let numSteps = Math.floor(time - lastTime);
  for (let i = 0; i < numSteps; ++i) {
    let force = -config.tension * (position - to);
    let damping = -config.friction * velocity;
    let acceleration = (force + damping) / config.mass;
    velocity = velocity + acceleration / 1000;
    position = position + velocity / 1000;
  }

  // Conditions for stopping the spring animation
  let isOvershooting =
    config.clamp && config.tension !== 0
      ? property.from < to
        ? position > to
        : position < to
      : false;
  let isVelocity = Math.abs(velocity) <= config.precision;
  let isDisplacement =
    config.tension !== 0 ? Math.abs(to - position) <= config.precision : true;

  console.log(isOvershooting || (isVelocity && isDisplacement))
  property.done = isOvershooting || (isVelocity && isDisplacement);
  property.lastTime = time;
  property.value = position;
  property.velocity = velocity;
}
