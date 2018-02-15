import React from "react";
import { string } from "prop-types";

import Thumbnail from "./Thumbnail";
import "./styles/Asset.css";
import "./styles/Asset-character.css";
import "./styles/Asset-phase.css";

const Asset = (props) => {
	// console.log(props.name, props.image);
	let {type} = props;
	if(type === "scene"){
		type = "phase";
	}
	return (

		<div className={`asset ${type}`}>
			<div className="hover-tint">
				<img
					src="/static/icons/edit_icon.png"
					className="edit-icon"
					alt={`edit ${type} icon`}
				/>
				<img
					src="/static/icons/delete_phase_icon_2.png"
					className="delete-icon"
					alt={`delete ${type} icon`}
				/>
			</div>
			<Thumbnail {...props} type={type} />
			<span>{props.name}</span>
		</div>
	);
}

Asset.propTypes = {
	name: string.isRequired,
	type: string.isRequired,
	// image: string.isRequired
}

export default Asset;
