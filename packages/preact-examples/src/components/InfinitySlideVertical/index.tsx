import { useRef, useEffect } from 'preact/hooks';
import { useSpring } from 'preact-spring-tiny';
import { useGesture } from 'react-use-gesture';

const cards = [
  'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
];

const style = {
  position: 'absolute',
  backgroundColor: 'white',
  width: '30%',
  height: '100%',
  borderRadius: '10px',
  boxShadow:
    '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
  backgroundSize: '100% 100%'
};

function Card({ url }: { url: string }) {
  const ref = useRef(null);
  return (
    <div
	ref={ref}
	style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover'
      }}
    />
  );
}

export default function SlidingDeck() {
  const refs: any = cards.map(() => useRef());
  let clientHeight = 0;
  let lineup = [2, 1, 0, -1, -2];

  const animates: any = refs.map(ref =>
    useSpring(ref, v => ({
      transform: `translate3d(0,${v.y}px,0)`,
      opacity: `${v.opacity}`
    }))
  );

  useEffect(() => {
    clientHeight = refs[0].current.clientHeight;
    animates.map((animate, i) => {
      animate({
        from: { y: -1000 },
        to: { y: lineup[i] * 300, opacity: 1 }
      });
    });
  }, [animates]);

  useEffect(() => {
    refs.map(ref => {
      ref.current.addEventListener(
        'touchmove',
        ev => {
          ev.preventDefault();
        },
        { passive: false }
      );
    });
  }, []);

  const bind = useGesture(
    ({ down, delta: [xDelta, yDelta], direction: [xDir, yDir], velocity }) => {
      const trigger = velocity > 0.3;
      const dir = yDir < 0 ? -1 : 1;
      const isGone = !down && trigger;

      if (isGone) {
        lineup =
          dir < 0
            ? lineup.map(v => (v === -2 ? 2 : v - 1))
            : lineup.map(v => (v === 2 ? -2 : v + 1));
      }

      animates.map((animate, i) => {
        let y = isGone
          ? lineup[i] * clientHeight
          : down
          ? yDelta + lineup[i] * clientHeight
          : lineup[i] * clientHeight;
        if (lineup[i] === -2 || lineup[i] === 2) {
          animate({ to: { y, opacity: 0 } });
        } else {
          animate({ to: { y, opacity: 1 } });
        }
      });
    }
  );

  return (
    <div className="container">
      <h3 className="container-title">Infinity Slide Vertical</h3>
      <div className="container-main">
        {cards.map((v, i) => (
          <div
            ref={refs[i]}
	{...bind(i)}
            // @ts-ignore
	style={{ ...style, padding: '3% 1.5%' }}
          >
            <Card url={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
