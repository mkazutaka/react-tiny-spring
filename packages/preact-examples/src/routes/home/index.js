import {h} from 'preact';
import style from './style';

import { useRef, useEffect } from "preact/hooks";
import { useSpring } from "preact-spring-tiny";

function Home() {
  const ref = useRef(null);
  const animate = useSpring(ref, (v) => ({
    transform: `translate3d(${v.x}px,0,0)`
  }));

  useEffect(() => {
    animate({from: {x: 0}, to: { x: 10 }})
  }, [animate]);

  return (
    <div className={style.home} ref={ref}>
      <h1 >Home</h1>
      <p>This is the Home component.</p>
    </div>
  )
}

export default Home;
