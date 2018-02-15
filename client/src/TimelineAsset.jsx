import React, { Component } from "react";
import { arrayOf, shape, object, string, number } from "prop-types";

import Asset from "./Asset";
import "./styles/TimelineAsset.css";

const headerWidth = 125;
const initialOpening = 30;
// const childWidth = 125;

function getWidth(props){
	let assetWidth = props.data.parents[props.parentId].widthInParent;
	if(props.data.type === "scene"){
		assetWidth = "";
	}
	else if(!assetWidth){
		// const childAssets = props.childAsset.filter(childAsset => {return props.id in childAsset.parents})
		assetWidth =  headerWidth + initialOpening;
	}

	return assetWidth;
}


class TimelineAsset extends Component {
	constructor(props) {
		super(props);

		this.state = {
			assetWidth: getWidth(props)
		};
	}

	renderChildren = () => {
		const {data} = this.props;

		function renderChild(childData) {
			const {positionInParent, widthInParent} = childData.parents[data.id];
			
			return (
				<div key={childData.id} style={{position: "absolute", width: widthInParent, left: positionInParent.x}}>
					<TimelineAsset data={childData} parentId={data.id}/>
				</div>
			);
		}

		return data.childAssets.map(renderChild);
	}

	render() {
		const { data } = this.props;
			// console.log(data);

		return (
			<div className="timeline-asset" style={{width: this.state.assetWidth}}>
				<div
					className="header"
					ref={header => {
						this.header = header;
					}}
				>
					<Asset name={data.name} type={data.type} image={data.image}  />
				</div>
				<div className="body">
					{
						this.renderChildren()
					} 
				</div>

				<div className="tail" style={{ 
					left: this.state.assetWidth, 
					visibility: data.type === "scene" ? "hidden" : ""
				}} />
			</div>
		);
	}
}



TimelineAsset.propTypes = {
	data: shape({
		id: string.isRequired,
		name: string.isRequired,
		type: string.isRequired,
		image: string,
		parents: object.isRequired,
		childAssets: arrayOf(object).isRequired
	}).isRequired
};

export default TimelineAsset;
