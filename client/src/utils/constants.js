export const actionTypes = {
	SELECT_ASSET: "SELECT_ASSET",

	CLICK_TIMELINE: "CLICK_TIMELINE",

	DESELECT_ASSET: "DESELECT_ASSET",

	FIT_TIMELINE_TO_FRAME: "FIT_TIMELINE_TO_FRAME",
	
	REMOVE_ASSET_FROM_PARENT: "REMOVE_ASSET_FROM_PARENT",

	DROP_ASSET: "DROP_ASSET",

	CALC_INSERT_POSITION: "CALC_INSERT_POSITION",

	HIDE_INSERT_POSITION: "HIDE_INSERT_POSITION",

	RESIZE_ASSET_TO_POSITION: "RESIZE_ASSET_TO_POSITION",

	RESET_REQUEST_FRAME: "RESET_REQUEST_FRAME"
};

export const dndTypes = {
	ASSET: "ASSET",
	TIMELINE_ASSET: "TIMELINE_ASSET",
	TAIL: "TAIL"
};

export const assetTypeHierarchy = {
	timeline: { child: "phase", parent: "none" },
	phase: { child: "scene", parent: "timeline" },
	scene: { child: "character", parent: "phase" },
	character: { child: null, parent: "scene" }
};

export const headWidthList = {
	timeline: 0,
	phase: 135,
	scene: 135
};

export const initialWidthList = {
	phase: 30,
	scene: 0,
	character: 0
};