'use strict';

import React from 'react';
import styles from './styles/index.css';
import PropTypes from 'prop-types';

/**
 * Generates two linear gradients based on the status and using the given color
 * @private
 * @param {Number} status Number from 0 to 100 representing the status
 * @param {String} color Color for the progress part
 * @return {String} The two gradients
 */
const getGradients = (status, color) => {
  let gradients;

  if (status < 50) {
    gradients = `
      linear-gradient(
        90deg,
        #ffffff 50%,
        transparent 50%,
        transparent
      ),
      linear-gradient(
        ${Math.round(90 + (3.6 * status))}deg,
        ${color} 50%,
        #ffffff 50%,
        #ffffff
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
        #ffffff 50%,
        #ffffff
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
export const getContainerStyles = (status, size, color) => {
  return {
    'backgroundImage': getGradients(status, color),
    color,
    width: `${size}px`,
    height: `${size}px`,
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
export const getLabelStyles = (labelColor, fontSize, size) => {
  return {
    color: `${labelColor}`,
    'font-size': `${fontSize}`,
    height: `${0.6 * size}px`,
    'line-height': `${0.6 * size}px`,
    'margin-left': `${0.2 * size}px`,
    'margin-top': `${0.2 * size}px`,
    width: `${0.6 * size}px`,
  };
};

/**
 * Creates the inline styles needed on background element
 * @public
 * @param {Number} size The width and height of the main container
 * @param {String} backgroundColor The background color
 * @return {String} A map with all relevant CSS properties and values
 */
export const getBackgroundElementStyles = (size, backgroundColor) => {
  return {
    'background-color': backgroundColor,
    height: `${size}px`,
    width: `${size}px`,
  };
};


export default class Rpc extends React.Component {

	static propTypes = {
		
	    backgroundColor: PropTypes.string,
	    color: PropTypes.string,
	    label: PropTypes.string,
	    labelColor: PropTypes.string,
	    labelSize: PropTypes.string,
	    size: PropTypes.number,
	    status: PropTypes.number
	}

	static defaultProps = {
		backgroundColor: '#404040',
		color: '#339900',
		label: '%s%',
		labelColor: '#111111',
		labelSize: '16px',
		size: 100,
		status: 0
	}

	static displayLabelContent(value, template) {

		return template.replace('%s', value);
	}



	render() {
		const { status, color, backgroundColor, label, size, labelColor, labelSize } = this.props;
		return (
			<div className="container">
				<div className="progress" 
					role="progressbar" 
					style={getContainerStyles(status, size, color)}>

					<span style={getLabelStyles(labelColor, labelSize, size)}>{Progress.displayLabelContent(status, label)}</span>
        			<div class="bg" style={getBackgroundElementStyles(size, backgroundColor)} />
                </div>
			</div>
		)
	}

}