import React from "react";
import {string} from "prop-types";

import PhaseCollection from "./PhaseCollection";
import CharacterCollection from "./CharacterCollection";

import "./styles/AssetContainer.css";

const componetes = {
	phases: PhaseCollection,
	scenes: PhaseCollection,
	characters: CharacterCollection
}

const AssetContainer = (props)=>{
	const RequestedCollection = componetes[props.type.toLowerCase()];

	return (
		<div className="asset-container">
		
			<header>
				<div className="h2Wrapper">
					<h2>{props.type.toUpperCase()}</h2>
				</div>
				<div className="small-plus-icon">&#43;</div>
			</header>
			<section className="container-body">
				<input type="text" placeholder="search" />
				<RequestedCollection />
			</section>

		</div>
	);
};

AssetContainer.propTypes = {
	type: string.isRequired
};

export default AssetContainer;