# react-spring-tiny

react-spring-tiny is an animation library for React or Preact users.

- :bicyclist: Spring Animation can be realized in 1kb
- :revolving_hearts: Do not need the original component like `<Animated>`
- :see_no_evil: But does not support complex animations currently

Currently, it is also an experimental library. We are asking for many opinions. Please watch if you are interested.

# Installation
react-spring-tiny is provided by npm package. 

```shell
# For react
$ yarn add -D react-spring-tiny
# For preact
$ yarn add -D preact-spring-tiny
```

# Build Examples

```
$ git clone git@github.com:mkazutaka/react-spring-tiny.git
$ yarn build
$ yarn start:react
```

# Exampels

- [Preact Spring Tiny Examples](https://preact-spring-tiny-examples.mkazutaka.now.sh)

# How to use

![leftright](https://user-images.githubusercontent.com/4601360/57581601-b809c100-74f4-11e9-9cb6-fa9b3793d6cc.gif)

```javascript
import { useSpring } from 'react-spring-tiny'

const App = () => {
  const ref = useRef(null);
  let currentX = 0;
  const animate = useSpring(ref, (v) => ({
    // key name x is used by animate function
    transform: `translate3d(${v.x}px,0,0)`
  }));

  const animateLeftRight = () => {
    currentX = currentX === 0 ? 300 : 0;
    animate({to: { x: currentX }})
    setTimeout(animateLeftRight, 1000)
  };

  useEffect(() => {
    animateLeftRight()
  }, [animate]);

  return <div ref={ref}/>
};
```

`useSpring` receives two arguments and return one function.

The first argument is the `Ref Object`.
`useSpring` overwrites Elements's style directory through `Ref Object`, so you need to provide that. 

The second is function. To apply animation transitions to the element, You need to specify what animation to achieve.

`useSpring` return `animate function`.
Animation Function receive object that has `to`.
`to` is goal of animation.


In this example, `x` is an arbitrary name. So you can change the value name.
However, the key name used in the `animate function` and the value passed in the second argument must be the same.


# Acknowledgment
This library is inspired from many libraries such as react-spring, react-motion, and anime.js. Many thanks to the creators and contributors of these libraries
