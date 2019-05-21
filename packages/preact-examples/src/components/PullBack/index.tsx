import { useRef } from 'preact/hooks';
import { useSpring } from 'react-spring-tiny';
import { useGesture } from 'react-use-gesture';

const style = {
  width: '100px',
  height: '100px',
  background: 'hotpink',
  borderRadius: '50%'
};

export default function Drag() {
  const ref = useRef(null);
  const animate = useSpring(ref, v => ({
    transform: `translate3d(${v.x}px,${v.y}px,0)`
  }));

  const bind = useGesture({
    onDrag: ({ delta }) => animate({ to: { x: delta[0], y: delta[1] } }),
    onDragEnd: () => animate({ to: { x: 0, y: 0 } })
  });

  return (
    <div className="container">
      <h3 className="container-title">PullBack</h3>
      <div className="container-main">
        <div ref={ref} {...bind()} style={style} />
      </div>
    </div>
  );
}
