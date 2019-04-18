import React from 'react';
import PropTypes from 'prop-types';
import { useFocusAwayHandler } from '../shared-hooks';

export function FocusAwayHandler({ children, onFocusAway }) {
	if (!onFocusAway) {
		return children;
	}

	const targetRef = useFocusAwayHandler(onFocusAway);

	return (
		<div tabIndex="-1" ref={targetRef}>
			{children}
		</div>
	);
}

FocusAwayHandler.propTypes = {
	children: PropTypes.node.isRequired,
	onFocusAway: PropTypes.func,
};
