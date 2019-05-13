import { useSpring as useSpringInternal } from "../useSpring";
import { Converter } from "../AnimatedTypes";
import { useRef } from "preact/hooks";

const useSpring = (ref: any, convert: Converter) =>
  useSpringInternal(ref, convert, useRef);

export { useSpring };
