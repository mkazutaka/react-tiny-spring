import { updateFrameFromScene } from '../src/updateFrameFromScene';

const defaultProperty = {
  value: 0,
  velocity: 0,
  lastTime: 0,
  startTime: 0,
  to: 0,
  from: 0,
  done: false
};

describe('updateFrameFromScene', () => {
  it('scene has "from" and "to" value', () => {
    const scene: any = { from: { x: 10, y: 20 }, to: { x: 100, y: 200 } };
    const frame: any = {
      x: defaultProperty,
      y: defaultProperty
    };
    const now = () => 1;
    const expectFrame: any = {
      x: {
        ...defaultProperty,
        value: 10,
        to: 100,
        from: 10,
        done: false
      },
      y: {
        ...defaultProperty,
        value: 20,
        to: 200,
        from: 20,
        done: false
      }
    };
    updateFrameFromScene(frame, scene, now);
    expect(expectFrame).toEqual(frame);
  });

  it('scene has "to" value', () => {
    const now = () => 0;
    const scene = { to: { x: 200, y: 200 } };
    const frame: any = {
      x: { ...defaultProperty, value: 100 },
      y: { ...defaultProperty, value: 200 }
    };
    const expectFrame = {
      x: { ...defaultProperty, value: 100, to: 200 },
      y: { ...defaultProperty, value: 200, to: 200 }
    };
    updateFrameFromScene(frame, scene, now);
    expect(expectFrame).toEqual(frame);
  });

  it('scene has part of from value', () => {
    const now = () => 0;
    const scene = { from: { y: 20 }, to: { x: 100, y: 100 } };
    const frame: any = {
      x: { ...defaultProperty, value: 100 },
      y: { ...defaultProperty, value: 200 }
    };
    const expectFrame = {
      x: { ...defaultProperty, value: 100, to: 100 },
      y: { ...defaultProperty, value: 20, to: 100, from: 20 }
    };
    updateFrameFromScene(frame, scene, now);
    expect(expectFrame).toEqual(frame);
  });

  it('scene has part of to value', () => {
    const now = () => 0;
    const scene = { from: { x: 10, y: 10 }, to: { x: 100 } };
    const frame: any = {
      x: { ...defaultProperty, value: 100 },
      y: { ...defaultProperty, value: 200 }
    };
    const expectFrame = {
      x: { ...defaultProperty, value: 10, to: 100, from: 10 },
      y: { ...defaultProperty, value: 200 }
    };
    updateFrameFromScene(frame, scene, now);
    expect(expectFrame).toEqual(frame);
  });

  it('continuous scene', () => {
    const now = () => 10;
    const scene = { to: { x: 100, y: 100 } };
    const frame = {
      x: {
        ...defaultProperty,
        value: 10,
        velocity: 0.1,
        lastTime: 1,
        startTime: 1,
        to: 200
      },
      y: {
        ...defaultProperty,
        value: 10,
        velocity: 0.1,
        lastTime: 1,
        startTime: 1,
        to: 200
      }
    };
    const expectFrame = {
      x: {
        ...defaultProperty,
        value: 10,
        velocity: 0.1,
        lastTime: 1,
        startTime: 1,
        to: 100
      },
      y: {
        ...defaultProperty,
        value: 10,
        velocity: 0.1,
        lastTime: 1,
        startTime: 1,
        to: 100
      }
    };
    updateFrameFromScene(frame, scene, now);
    expect(expectFrame).toEqual(frame);
  });
});
