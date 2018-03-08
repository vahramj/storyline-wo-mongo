import { DragSource, DropTarget } from "react-dnd";
import _ from "lodash";

import TimelineAsset from "./TimelineAsset";
import { dndTypes } from "../utils/constants";
import { isInsertLegal } from "../utils/appLogic";

const dragSpec = {
	beginDrag(props) {
		const { assetId, type } = props;

		props.selectAsset(assetId);
		// console.log("beginDrag: ", assetId);
		return { assetId, type };
	}
};

const dropSpec = {
	drop(props, monitor, { dropElem }) {
		// console.log("dropping from TimelineAsset")
		if (monitor.didDrop()) {
			return;
		}

		const targetId = props.assetId;
		const { assetId: sourceId } = monitor.getItem();
		// console.log("dragElem: ", dragElem);
		// console.log("initialClientOffset: ", monitor.getInitialClientOffset());
		const grabPosLeftEdgeOffset = monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x
		const dropPosition = monitor.getClientOffset().x - grabPosLeftEdgeOffset;

		const params = {
			sourceId,
			targetId,
			dropPosition,
			dropElem,
		};

		props.handleDropAsset(params);
		props.hideInsertPosition();
	},
	hover(props, monitor, { dropElem }) {
		const itemDnDType = monitor.getItemType();
		if(itemDnDType === dndTypes.TAIL && props.type === "timeline"){

			const dragAssetId = monitor.getItem().ownerId;
			const resizeElem = monitor.getItem().ownerElem;

			// console.log(resizeElem)
			
			const leftEdgePosRelToViewport = Math.round(monitor.getSourceClientOffset().x);
			const elemPosRelToViewport = Math.round(resizeElem.getBoundingClientRect().left);
			const leftEdgePos = leftEdgePosRelToViewport - elemPosRelToViewport;
			// console.log(leftEdgePos)
			props.resizeAssetToPosition(dragAssetId, leftEdgePos);
			return;
		}

		if (!monitor.canDrop()) {
			return;
		}

		// console.log("hovering & can drop")
		const { assetId: targetId } = props;
		const sourceId = monitor.getItem().assetId;
		const grabPosLeftEdgeOffset = monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x
		const hoverPosition = monitor.getClientOffset().x - grabPosLeftEdgeOffset;
		const params = {
			hoverPosition,
			dropElem,
			targetId,
			sourceId
		};
		props.calcInsertPosition(params);
	},
	canDrop(props, monitor) {
		// console.log("isOver asset: ", monitor.isOver())

		const { type: sourceType } = monitor.getItem();
		const { type: targetType } = props;
		// console.log("sourceType: ", sourceType, "targetType: ", targetType);

		// vahram, you might not need to drop tail, if first thing in hover is checking dndType === "TAIL"
		const itemDnDType = monitor.getItemType();
		if(itemDnDType === dndTypes.TAIL){
			return false;
		}

		return isInsertLegal(sourceType, targetType).result;
	}
};

const collectDrag = (connectDnD, monitor) => {
	return {
		connectDragSource: connectDnD.dragSource(),
		isDragging: monitor.isDragging()
	};
};

const collectDrop = (connectDnD, monitor) => {
	return {
		connectDropTarget: connectDnD.dropTarget(),
		isHovering: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
};


const decorator = _.flowRight([
	DragSource(dndTypes.TIMELINE_ASSET, dragSpec, collectDrag),
	DropTarget([dndTypes.ASSET, dndTypes.TIMELINE_ASSET, dndTypes.TAIL], dropSpec, collectDrop )
]);

export default decorator(TimelineAsset);

