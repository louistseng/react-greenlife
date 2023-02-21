import React, { useState, useEffect } from 'react';

const ProgressBar = ({done}) => {
	const [style, setStyle] = React.useState({});
	
	useEffect(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		setStyle(newStyle);
	},[]);
	
	return (
		<div className="progress">
			<div className="progress-done" style={style}>
				{/* {done}% */}
			</div>
		</div>
	)
}

export default ProgressBar;
