'use strict';

import React from 'react';
import Module from '../src/module';
 
export default class App extends React.Component {

	state = {
		status: 50
	}

	componentDidMount() {
		var self = this;
		var toLower;
		var toUpper;
		var init;

		var upper = function() {
			if(self.state.status === 99) {
				clearInterval(toUpper);
				toLower = setInterval(lower.bind(self), 20);
			};

			self.setState({status: self.state.status - - 1});
		}

		var lower = function() {
			if(this.state.status === 0) {
				clearInterval(toLower);
				init()
				return;
			}
			this.setState({status: this.state.status - 1});
		}

		var init = function () {
			toUpper = setInterval(upper, 20);
		}

		init();		
	}

  render() { 

  	let settings1 = {
		parentBackgroundColor: '#fff',
		parentColor: 'red',
		size: 180,
		labelTemp: '%s%',
		labelColor:'#fff',
		labelBackgroundColor: 'rgb(17, 17, 17)',
		labelSize: '20px',
		backgroundColor: '#FD971F'
  	}


    return (
      <div className='content'>
      	<h2>React simple progress bar circle.</h2>
        <br />

        <Module status={this.state.status} />
        <br />

        <Module status={this.state.status} {...settings1 }/>

        <br />

      </div>
    );
  }
}
