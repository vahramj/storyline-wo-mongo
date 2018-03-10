import React from "react";
import { connect } from "react-redux";
import { string } from "prop-types";

import Thumbnail from "./Thumbnail";

const AssetBase = props => {
	const { name, image, type } = props;

	return (
		<div className={`asset-base ${type}`}>
			<Thumbnail {...{ image, name, type }} />
			<span>{name}</span>
		</div>
	);
};

AssetBase.propTypes = {
	image: string,
	name: string.isRequired,
	type: string.isRequired,
};

AssetBase.defaultProps = {
	image: ""
};

function mapStateToProps({ data }, { assetId }){
	const assetData = data[assetId];
	const {name, type, image} = assetData;
	return { name, type, image };
}

export default connect(mapStateToProps)(AssetBase);
