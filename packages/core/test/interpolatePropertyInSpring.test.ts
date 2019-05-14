import { interpolateWithSpring } from "../src/interpolator/interpolateWithSpring";

describe("Animation", () => {
  it("spring Interpolator", () => {
    const now = () => 11;
    const lastTime = 10;
    let property = {
      value: 10,
      velocity: 0,
      lastTime: lastTime,
      startTime: 0,
      to: 101,
      from: 10,
      done: false
    };
    let expectProperty = {
      value: 10.0728,
      velocity: 72.8,
      lastTime: 11,
      startTime: 0,
      to: 101,
      from: 10,
      done: false
    };

    const config = {
      tension: 800,
      friction: 26,
      mass: 1,
      initialVelocity: 0,
      clamp: false,
      precision: 0.01
    };

    interpolateWithSpring(property, config, now);
    expect(expectProperty).toEqual(property);
  });
});
