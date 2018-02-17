import React from "react";
import { shape, object, arrayOf, string, func } from "prop-types";
// import { connect } from "react-redux";

import Thumbnail from "./Thumbnail";
// import { selectAsset } from "../actions/actionCreators";

import "./styles/Asset.css";
import "./styles/Asset-character.css";
import "./styles/Asset-phase.css";

const Asset = (props) => {
	const { selectedAsset } = props;
	const { name, image } = props.data;
	let { type } = props.data;
	if(type === "scene"){
		type = "phase";
	}
	const selectedStyle = selectedAsset === props.data ? "selected" : "";
	// if(selectedStyle){
	// 	console.log(props);
	// }
	return (
		<div 
			className={`asset ${type} ${selectedStyle}`} 
			role="none" 
			onClick={ ()=>{
				props.handleSelectAsset(props.data)} 
			}>
			
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
			<Thumbnail { ...{image, name, type}} />
			<span>{name}</span>
		</div>
	);
}

Asset.propTypes = {
	data: shape({
		id: string.isRequired,
		name: string.isRequired,
		type: string.isRequired,
		image: string,
		parents: object.isRequired,
		childAssets: arrayOf(object).isRequired
	}).isRequired,
	handleSelectAsset: func,
	selectedAsset: shape()
};

Asset.defaultProps = {
	handleSelectAsset: ()=>{console.log("Vahram, Asset click handler hasn't been setup ")},
	selectedAsset: {id:null}
}

// function mapDispatchToProps(dispatch){
// 	return {
// 		handleSelectAsset(asset){
// 			dispatch(selectAsset(asset))
// 		}
// 	}
// }

// export default connect(null, mapDispatchToProps)(Asset);
export default Asset;



