import {useRef, useEffect} from "preact/hooks";
import {useSpring} from "react-spring-tiny";

const logo = "https://user-images.githubusercontent.com/4601360/57931070-99d80280-78f2-11e9-86de-0a6a5d5fbe30.png";

export default function HelloWorld() {
  const ref = useRef(null);
  let currentX = 0;
  const animate = useSpring(ref, (v) => ({
    // key name x is used by animate function
    transform: `translate3d(${v.x}px,0,0)`
  }));

  const animateLeftRight = () => {
    currentX = currentX === -150 ? 150 : -150;
    animate({to: {x: currentX}});
    setTimeout(animateLeftRight, 1000)
  };

  useEffect(() => {
    animateLeftRight()
  }, [animateLeftRight]);

  return (
      <div className="container">
        <h3 className="container-title">HelloWorld</h3>
        <div className="container-main">
          <div ref={ref}>
            <img src={logo} className="container-image" alt="logo" style={{height: "7em", width: "7em"}}/>
          </div>
        </div>
      </div>
  );
}
