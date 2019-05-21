import { h, Component } from 'preact';

import HelloWorld from './HelloWorld';
import PullBack from './PullBack';
import SlidingDeck from './SlidingDeck';
import InfinitySlide from './InfinitySlide';
import InfinitySlideVertical from './InfinitySlideVertical';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <HelloWorld />
        <PullBack />
        <SlidingDeck />
        <InfinitySlide />
        <InfinitySlideVertical />
      </div>
    );
  }
}
