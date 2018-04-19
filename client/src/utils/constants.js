export const ROOT_URL = "http://localhost:3000";

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

	SET_FRAME_REQUESTOR: "SET_FRAME_REQUESTOR",

	SET_SEARCH_TERM: "SET_SEARCH_TERM",

	SAVE_ASSET_DETAILS: "SAVE_ASSET_DETAILS",

	DELETE_ASSET: "DELETE_ASSET",

	SET_ASSETS: "SET_ASSETS"
};

export const dndTypes = {
	ASSET: "ASSET",
	TIMELINE_ASSET: "TIMELINE_ASSET",
	TAIL: "TAIL",
	EDITABLE_IMAGE: "EDITABLE_IMAGE",
	EDIT_IMAGE_HANDLE: "EDIT_IMAGE_HANDLE"
};

export const assetTypeHierarchy = {
	timeline: { child: "phase", parent: "none" },
	phase: { child: "scene", parent: "timeline" },
	scene: { child: "character", parent: "phase" },
	character: { child: null, parent: "scene" }
};

export const frameSizes = {
	phase: {frameWidth: 125, frameHeight: 70, borderRadius: 0},
	scene: {frameWidth: 125, frameHeight: 70, borderRadius: 20},
	character: {frameWidth: 78, frameHeight: 78, borderRadius: 50},
}

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

