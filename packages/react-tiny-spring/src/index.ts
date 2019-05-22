import { useSpring as useSpringInternal, Converter } from 'core-tiny-spring';
import { useRef } from 'react';

const useSpring = (ref: any, convert: Converter) =>
  useSpringInternal(ref, convert, useRef);

export { useSpring };
