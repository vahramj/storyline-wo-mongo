export const dragSpec = {
	beginDrag() {
		console.log("dragging");
		return {};
	}
};

export const dropSpec = {
	drop(props, monitor, component) {
		// const { x, y } = monitor.getDifferenceFromInitialOffset();
		console.log("dropped");
		// component.dragImageBy(x, y);
		component.resetDragOffset();
	},
	hover(props, monitor, component) {
		const { x, y } = monitor.getDifferenceFromInitialOffset();
		component.dragImageBy(x, y);
		// console.log(monitor.getDifferenceFromInitialOffset());
	}
};

export function collectDrag(connectDnD, monitor) {
	return {
		connectDragSource: connectDnD.dragSource(),
		connectDragPreview: connectDnD.dragPreview()
		// isDragging: monitor.isDragging()
	};
};

export function collectDrop(connectDnD) {
	return {
		connectDropTarget: connectDnD.dropTarget()
	};
};