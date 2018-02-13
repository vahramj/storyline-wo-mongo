import React from "react";

import "./styles/toolbox.css";

const Toolbox = () => {
	return (
		<div id="toolbox">
			<div>zoom in</div>
			<div>scale</div>
			<div>zoom out</div>
			<div>
				<input type="text" placeholder="search" />
			</div>
		</div>
	);
};

export default Toolbox;

