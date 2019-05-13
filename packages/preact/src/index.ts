import { useSpring as useSpringInternal, Converter } from "react-spring-tiny-core";
import { useRef } from "preact/hooks";

const useSpring = (ref: any, convert: Converter) =>
  useSpringInternal(ref, convert, useRef);

export { useSpring };
