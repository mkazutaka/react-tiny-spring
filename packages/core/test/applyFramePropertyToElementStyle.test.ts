import { applyFramePropertyToElementStyle } from "../src/applyFramePropertyToElementStyle";

describe("applyFramePropertyToElementStyle", () => {
  it("apply Animation Style", () => {
    const element: any = { style: {} };
    const style: any = {
      transform: "translate3d(10px,10px,0)"
    };
    const expectNode = {
      style: {
        transform: "translate3d(10px,10px,0)"
      }
    };
    applyFramePropertyToElementStyle(style, element);
    expect(expectNode).toEqual(element);
  });
});
