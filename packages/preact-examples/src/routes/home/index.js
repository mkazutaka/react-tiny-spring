import {h} from 'preact';
import style from './style';

import { useRef, useEffect, useState } from "preact/hooks";
import { useSpring } from "preact-spring-tiny";
// import { useSpring } from "core-spring-tiny"

function Home() {
  const ref = useRef(null);
  const test = useRef("test");
  const animate = useSpring(ref, (v) => ({
    transform: `translate3d(${v.x}px,0,0)`
  }));
  const [count, setCount] = useState(0);

  useEffect(() => {
    animate({to: { x: 10 }})
  }, [animate]);

  return (
    <div className={style.home} ref={ref}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <button onClick={() => setCount(count + 1)}>button</button>
    </div>
  )
}

export default Home;
