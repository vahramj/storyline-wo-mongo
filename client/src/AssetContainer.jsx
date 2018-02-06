import React from "react";
import {string} from "prop-types";

import AssetCollection from "./AssetCollection";

import "./styles/AssetContainer.css";

const AssetContainer = (props)=>{
	return (
		<div className="asset-container">
		
			<header>
				<div className="h2Wrapper">
					<h2>{`${props.type}s`.toUpperCase()}</h2>
				</div>
				<div className="small-plus-icon">&#43;</div>
			</header>
			<section className="container-body">
				<div className="search-bg-fader">
					<input type="text" placeholder="search" />
				</div>
				<AssetCollection type={props.type} />
			</section>
		</div>
	);
};

AssetContainer.propTypes = {
	type: string.isRequired
};

export default AssetContainer;