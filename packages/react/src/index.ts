import { useSpring as useSpringInternal, Converter } from "core-spring-tiny";

const useSpring = (ref: any, convert: Converter) =>
  useSpringInternal(ref, convert);

export { useSpring };
