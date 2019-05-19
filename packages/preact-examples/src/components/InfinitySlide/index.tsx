import {useRef, useEffect, useState} from 'preact/hooks';
import {useSpring} from 'preact-spring-tiny';
import {useGesture} from 'react-use-gesture';

const cards = [
  'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
];

function Card() {
  const ref = useRef(null);
  const num = Math.floor(Math.random() * 3);
  const [zIndex, updateZIndex] = useState(10000);
  const cardBodyStyle = {
    width: "100%",
    height: "100%",
    backgroundSize: "cover"
  };
  const style = {
    position: "absolute",
    backgroundColor: "white",
    width: "23%",
    height: "80%",
    borderRadius: "10px",
    boxShadow:
        "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)",
    backgroundSize: "100% 100%",
    padding: "3% 1.5%",
    zIndex: zIndex
  };
  const animate: any = useSpring(ref, v => (
      {
        transform: `perspective(1500px) translate3d(${v.x}px,${v.y}px,0) scale(${v.scale}) rotateX(30deg) rotateY(${v.r / 10}deg) rotateZ(${v.r}deg)`,
        opacity: `${v.opacity}`
      }));
  const bind = useGesture(
      ({down,
         delta: [xDelta],
         direction: [xDir],
         velocity
       }) => {
        const trigger = velocity > 0.3;
        const dir = xDir < 0 ? -1 : 1;
        const isGone = !down && trigger;
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        animate({to: {x, y: 0, scale, r: rot}});
        if (!down && isGone) setTimeout(() => {
          animate({to: {x: 0, opacity: 0}});
          updateZIndex(zIndex + -1);
        }, 600);
      }
  );
  useEffect(() => {
    animate({
      from: {x: 0, rot: 0, scale: 1.5, y: -1000},
      to: {x: 0, y: 0, scale: 1, r: -10 + Math.random() * 20,  opacity: 1}
    });
  }, [animate]);
  return (
      <div ref={ref} {...bind()} style={style}>
        <div style={{...cardBodyStyle, backgroundImage: `url(${cards[num]})`}}/>
      </div>
  );
}

export default function InfinitySlide() {
  return (
      <div className="container">
        <h3 className="container-title">InfitinySlide</h3>
        <div className="container-main">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
  );
}
