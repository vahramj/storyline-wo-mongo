import React from "react";
import {string} from "prop-types";
import "./styles/Phase.css";

const Phase = (props)=>{
	return (
		<div className="phase">
			<img src={props.img} alt={`thumbnail for ${props.name}`} />
			<span>{props.name}</span>
		</div>
	);
};

Phase.propTypes = {
	img: string.isRequired,
	name: string.isRequired
}

export default Phase;