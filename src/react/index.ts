import { useSpring as useSpringInternal } from "../useSpring";
import { Converter } from "../AnimatedTypes";
import { useRef } from "react";

const useSpring = (ref: any, convert: Converter) =>
  useSpringInternal(ref, convert, useRef);

export { useSpring };
