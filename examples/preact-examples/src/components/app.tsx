import { Component, h } from "preact";
import { useRef } from "preact/hooks"
import { useSpring } from 'react-spring-tiny/preact'
import { useGesture } from 'react-use-gesture'

import Header from "./header";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const App = () => {
    const ref = useRef(null);
    const animate = useSpring(ref, (v) => ({
        transform: `translate3d(${v.x}px,0,0)`
    }));

    const bind = useGesture(({ down, delta, velocity }) => {
        // velocity = clamp(velocity, 1, 8)
        const x = delta[0];
        const y = delta[1];

        if(down) {
            animate({
                to: { x, y }
            })
        } else {
            animate({
                to: { x: 0.0, y: 0.0 }
            })
        }
    });

    // return <div ref={ref}/>
    return <div ref={ref} {...bind()}/>
};

export default App;

