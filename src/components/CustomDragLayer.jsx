import React, { Component } from "react";
import { DragLayer } from "react-dnd";
import { shape, string, number, bool } from "prop-types";

import TimelineAsset from "./TimelineAsset/TimelineAsset";
import AssetBase from "./AssetBase";
import { dndTypes } from "../utils/constants";

function collect(monitor){
	// console.log(monitor.getItem())
	return {
		assetData: monitor.getItem(),
		dndType: monitor.getItemType(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	};
}

class CustomDragLayer extends Component {
	getLayerStyle(){
		const { currentOffset } = this.props;
		if( !currentOffset){
			return {
				// display: "block"
				display: "none"
			};
		}
		const { x, y } = currentOffset;
		return {
			left: x,
			top: y,
		}
	}

	renderLayer(){
		const {dndType, assetData: {assetId}} = this.props;
		switch(dndType){
			case dndTypes.ASSET: {
				return (
					<AssetBase assetId={assetId} />
				);
			}
			case dndTypes.TIMELINE_ASSET: {
				return <TimelineAsset assetId={assetId} />
			}
			default: 
				return null;
		}
	}

	render(){
		const { isDragging } = this.props;

		if(!isDragging){
			return null;
			// return (
			// 	<div id="custom-drag-layer" style={{left: 0, top:0}}>
			// 		<TimelineAsset assetId="phs_01" />
			// 	</div>
			// );
		}
		
		const style = this.getLayerStyle();
		// console.log(dndType);
		let DragAsset = this.renderLayer();
		if(DragAsset){
			DragAsset = (
				<div id="custom-drag-layer" style={style}>
					{DragAsset}
				</div>
			)
		}
		return DragAsset;
	}
}

CustomDragLayer.propTypes = {
	assetData: shape({
		assetId: string
	}),
	dndType: string,
	currentOffset: shape({
		x: number.isRequired,
		y: number.isRequired
	}),
	isDragging: bool.isRequired
}

CustomDragLayer.defaultProps = {
	assetData: null,
	dndType: null,
	currentOffset: null
}

export default DragLayer(collect)(CustomDragLayer);
