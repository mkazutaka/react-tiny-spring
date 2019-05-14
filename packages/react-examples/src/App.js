import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useRef, useEffect } from "react";
import { useSpring } from "react-spring-tiny";

function App() {
  const ref = useRef(null);
  let currentX = 0;
  const animate = useSpring(ref, (v) => ({
    // key name x is used by animate function
    transform: `translate3d(${v.x}px,0,0)`
  }));

  const animateLeftRight = () => {
    currentX = currentX === -150 ? 150 : -150;
    animate({to: { x: currentX }})
    setTimeout(animateLeftRight, 1000)
  };

  useEffect(() => {
    animateLeftRight()
  }, [animateLeftRight]);

  return (
    <div className="App">
      <header className="App-header">
        <div ref={ref}>
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
