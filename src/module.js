'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/index.css';

/**
 * Generates two linear gradients based on the status and using the given color
 * @private
 * @param {Number} status Number from 0 to 100 representing the status
 * @param {String} color Color for the progress part
 * @return {String} The two gradients
 */
const getGradients = (status, color, backgroundColor) => {
  let gradients;

  if (status < 50) {
    gradients = `
      linear-gradient(
        90deg,
        ${backgroundColor} 50%,
        transparent 50%,
        transparent
      ),
      linear-gradient(
        ${Math.round(90 + (3.6 * status))}deg,
        ${color} 50%,
        ${backgroundColor} 50%,
        ${backgroundColor}
      )
    `;
  } else {
    gradients = `
      linear-gradient(
        ${Math.round(-90 + (3.6 * (status - 50)))}deg,
        ${color} 50%,
        transparent 50%,
        transparent
      ),
      linear-gradient(
        270deg,
        ${color} 50%,
        ${backgroundColor} 50%,
        ${backgroundColor}
      )
    `;
  }

  return gradients;
};

/**
 * Creates the inline styles needed on the main container
 * @public
 * @param {Number} status Number from 0 to 100 representing the status
 * @param {Number} size The width and height of the main container
 * @param {String} color Color for the progress part
 * @return {String} A map with all relevant CSS properties and values
 */
export const getContainerStyles = (status, size, color, backgroundColor) => {
  return {
    color,
    backgroundColor,
    width: `${size}px`,
    height: `${size}px`,
    'backgroundImage': getGradients(status, color, backgroundColor),
  };
};

/**
 * Creates the inline styles needed on the label
 * @public
 * @param {String} labelColor The color of the label
 * @param {String} fontSize The font-size of the label
 * @param {Number} size The width and height of the main container
 * @return {String} A map with all relevant CSS properties and values
 */
export const getLabelStyles = (backgroundColor, color, fontSize, size) => {
  return {
	color: `${color}`,
	'fontSize': `${fontSize}`,
	'marginLeft': `${0.2 * size}px`,
	'marginTop': `${0.2 * size}px`,
	'lineHeight': `${0.6 * size}px`,
	height: `${0.6 * size}px`,
	width: `${0.6 * size}px`,
	background: `${backgroundColor}`,
	'boxShadow': `0px 0px 1px 8px ${backgroundColor}`,

  };
};

/**
 * Creates the inline styles needed on background element
 * @public
 * @param {Number} size The width and height of the main container
 * @param {String} backgroundColor The background color
 * @return {String} A map with all relevant CSS properties and values
 */
export const getBackgroundElementStyles = (size, backgroundColor, parentColor) => {
  return {
    backgroundColor,
    'boxShadow': `inset 0px 0px 130px ${parentColor}`,
    'height': `${size}px`,
    'width': `${size}px`,
    'position': 'absolute',
    'left': '0',
    'top': '0',
    'opacity': '0.15',
    'borderRadius': '50%',
    'display': 'block',
    'content': ' ',
    'zIndex': '1'
  };
};





export default class Rpc extends React.Component {
	constructor(props) {
      super(props);
  	}


	static propTypes = {
	    parentBackgroundColor: PropTypes.string,
	    backgroundColor: PropTypes.string,
	    parentColor: PropTypes.string,
	    label: PropTypes.string,
	    labelColor: PropTypes.string,
	    labelSize: PropTypes.string,
	    size: PropTypes.number,
	    status: PropTypes.number.isRequired
	}

	static defaultProps = {
		parentBackgroundColor: '#272822',
		parentColor: '#1724d2',
		size: 100,
		labelTemp: '%s%',
		labelColor: '#fff',
		labelBackgroundColor: '#272822',
		labelSize: '16px',
		backgroundColor: '#f7f2f2',
	}

	static displayLabelContent(value, template) {
		return template.replace('%s', value);
	}

	state = {status: 0}

	componentDidMount() {
		this._isMounted = true;
		this.setState({status: this.props.status});
	}

	componentWillReceiveProps(nextProps) {
		if(this._isMounted && nextProps.status &&  nextProps.status !== this.state.status) {
			this.setState({
				status: nextProps.status
			});
		}
	}


	render() {
		const { 
			parentBackgroundColor,
			parentColor, 
			size, 
			labelTemp,
			labelColor,
			labelSize,
			labelBackgroundColor,
			backgroundColor
		} = this.props;

		return (
			<div className="container">
				<div className="progress" role="progressbar" style={getContainerStyles(this.state.status, size, parentColor, parentBackgroundColor)}>
					<span style={getLabelStyles(labelBackgroundColor, labelColor, labelSize, size)}>{Rpc.displayLabelContent(this.state.status, labelTemp)}</span>
					<div style={getBackgroundElementStyles(size, backgroundColor, parentColor)}> </div>
                </div>
			</div>
		) 
	}
}
