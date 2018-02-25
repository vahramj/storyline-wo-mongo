import React, {Component, PureComponent} from "react";
import { shape, /* object, arrayOf, */ bool, string, func } from "prop-types";
// import { connect } from "react-redux";

import Thumbnail from "./Thumbnail";
// import { selectAsset } from "../actions/actionCreators";

import "./styles/Asset.css";
import "./styles/Asset-character.css";
import "./styles/Asset-phase.css";
import "./styles/Asset-scene.css";

class Asset extends PureComponent {
	containerAssetAttributes = {
			role: "none",
			onClick: event => {
				event.stopPropagation();
				this.props.handleClick(event, this.props.assetData)
			} 			
		}

	render(){	
		const { selected, onTimeline, assetData } = this.props;
		const { name, image, type } = assetData;

		const selectedStyle = selected ? "selected" : "";
		const onTimelineStyle = onTimeline ? "onTimeline" : "";
		
		const assetAttributes = this.props.decorative ? {} : this.containerAssetAttributes; 

		return (
			<div className={`asset ${type} ${selectedStyle} ${onTimelineStyle}` } {...assetAttributes}>
				
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
}

Asset.propTypes = {
	assetData: shape({
		id: string.isRequired,
		name: string.isRequired,
		type: string.isRequired,
		image: string,
	}).isRequired,
	handleClick: func,
	selected: bool,
	onTimeline: bool,
	decorative: bool
};

Asset.defaultProps = {
	handleClick: ()=>{console.log("Vahram, Asset click handler hasn't been setup ")},
	onTimeline: false,
	decorative: false,
	selected: false
}

// function mapDispatchToProps(dispatch){
// 	return {
// 		handleClick(asset){
// 			dispatch(selectAsset(asset))
// 		}
// 	}
// }

// export default connect(null, mapDispatchToProps)(Asset);
export default Asset;



