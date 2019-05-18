import { useRef, useEffect } from 'preact/hooks';
import { useSpring } from 'preact-spring-tiny';
import { useGesture } from 'react-use-gesture';

const cards = [
  "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg"
];

const style = {
  backgroundColor: "white",
  width: "23%",
  height: "80%",
  borderRadius: "10px",
  boxShadow:
    "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)",
  backgroundSize: "100% 100%"
};

/**
 * origin: https://codesandbox.io/embed/j0y0vpz59
 */
export default function Deck() {
  const gone = new Set();
  const ref = useRef(null);
  const animate = useSpring(ref, v => ({
    transform: `perspective(1500px) translate3d(${v.x}px,${v.y}px,0) scale(${
			v.scale
		}) rotateX(30deg) rotateY(${v.r / 10}deg) rotateZ(${v.r}deg)`
  }));

  const bind = useGesture(
		({
			args: [index],
			down,
			delta: [xDelta],
			distance,
			direction: [xDir],
			velocity
		}) => {
			const trigger = velocity > 0.3;
			const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);

			const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
			const scale = down ? 1.1 : 1;

      animate({ to: { x, y: 0, scale, r: rot } });
			if (!down && gone.size === 1)
				setTimeout(() => gone.clear() || animate({ to: { x: 0 } }), 600);
		}
	);

  useEffect(() => {
    animate({
      from: { x: 0, rot: 0, scale: 1.5, y: -1000 },
      to: { x: 0, y: 0, scale: 1, r: -10 + Math.random() * 20 }
    });
  }, [animate]);

  return (
		<div className="container">
      <h3 className="container-title">Single Sliding Card</h3>
			<div className="container-main">
        <div
          class="card"
          ref={ref}
          {...bind()}
          style={{ ...style, padding: "3% 1.5%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${cards[0]})`,
              backgroundSize: "cover"
            }}
          />
				</div>
      </div>
		</div>
  );
}
