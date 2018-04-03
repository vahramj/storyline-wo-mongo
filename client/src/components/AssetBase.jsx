import React from "react";
import { connect } from "react-redux";
import { string, shape } from "prop-types";

import Thumbnail from "./Thumbnail";

const AssetBase = props => {
	const { name, imageData, type } = props;

	return (
		<div className={`asset-base ${type}`}>
			<Thumbnail {...{ imageData, name, type }} />
			<span>{name}</span>
		</div>
	);
};

AssetBase.propTypes = {
	imageData: shape(),
	name: string.isRequired,
	type: string.isRequired,
};

AssetBase.defaultProps = {
	imageData: null
};

function mapStateToProps({ assetsData }, { assetId }){
	const { data } = assetsData;
	
	const assetData = data[assetId];
	const {name, type, imageData} = assetData;
	return { name, type, imageData };
}

export default connect(mapStateToProps)(AssetBase);
