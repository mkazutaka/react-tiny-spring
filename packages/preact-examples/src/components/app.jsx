import { h, Component } from 'preact';

import HelloWorld from './HelloWorld'
import PullBack from './PullBack';
import SingleSlidingCard from './SingleSlidingCard';

export default class App extends Component {

	render() {
		return (
			<div id="app">
				<HelloWorld />
				<PullBack />
				<SingleSlidingCard />
			</div>
		);
	}
}
