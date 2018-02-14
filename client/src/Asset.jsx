import React from "react";
import { string } from "prop-types";

import Thumbnail from "./Thumbnail";
import "./styles/Asset.css";
import "./styles/Asset-character.css";
import "./styles/Asset-phase.css";

const Asset = (props) => {
	return (
		<div className={`asset ${props.type}`}>
			<div className="hover-tint">
				<img
					src="/static/icons/edit_icon.png"
					className="edit-icon"
					alt={`edit ${props.type} icon`}
				/>
				<img
					src="/static/icons/delete_phase_icon_2.png"
					className="delete-icon"
					alt={`delete ${props.type} icon`}
				/>
			</div>
			<Thumbnail {...props} />
			<span>{props.name}</span>
		</div>
	);
}

Asset.propTypes = {
	name: string.isRequired,
	type: string.isRequired
}

export default Asset;
