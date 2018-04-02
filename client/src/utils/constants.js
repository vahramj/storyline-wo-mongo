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

	SET_CURRENT_IMAGE_DATA: "SET_CURRENT_IMAGE_DATA"
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

const timelineData = {
	tmln_01: {
		id: "tmln_01",
		name: "first draft",
		type: "timeline",
		width: 1500,
		position: 0,
		defaultWidth: true,
		parent: null,
		children: [
			{
				id: "phs_01"
			}
			// {
			// 	id: "phs_03",
			// },
		]
	}
};

const phaseData = {
	phs_01: {
		id: "phs_01",
		name: "opeining image",
		type: "phase",
		width: 250,
		position: 0,
		parent: {
			id: "tmln_01"
		},
		children: [
			// {
			// 	id: "scn_05",
			// },
			// {
			// 	id: "scn_08",
			// },
		],
		image: "/static/images/phase_thumbnails/opening image 02_thumb.png"
	},
	phs_03: {
		id: "phs_03",
		name: "setup",
		type: "phase",
		width: 300,
		position: 650,
		// width: null,
		// parent: {
		// 	id: "tmln_01",
		// },
		children: [
			// {
			// 	id: "scn_20",
			// }
		]
		// image: ""
	},
	phs_05: {
		id: "phs_05",
		name: "catalist",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/phase_thumbnails/catalist 01_thumb.png"
	},
	phs_10: {
		id: "phs_10",
		name: "debate",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: ""
	},
	phs_15: {
		id: "phs_15",
		name: "breaking into 2",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/phase_thumbnails/breaking into two 03_thumb.png"
	},
	phs_17: {
		id: "phs_17",
		name: "fun and games",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/phase_thumbnails/fun and games 03_thumb.png"
	},
	phs_20: {
		id: "phs_20",
		name: "bad guys close in",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/phase_thumbnails/bad guys close in 05_thumb.png"
	},
	phs_23: {
		id: "phs_23",
		name: "breaking into three",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/phase_thumbnails/breaking into three 01_thumb.png"
	},
	phs_25: {
		id: "phs_25",
		name: "finaly",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/phase_thumbnails/fanale 03_thumb.png"
	},
	phs_30: {
		id: "phs_30",
		name: "closing image",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/phase_thumbnails/closing image 02_thumb.png"
	}
};

const sceneData = {
	scn_05: {
		id: "scn_05",
		name: "fellowship begins",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/scene_thumbnails/fellowship begins_thumb.png"
	},
	scn_08: {
		id: "scn_08",
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		image: ""
	},
	scn_10: {
		id: "scn_10",
		name: "frodo's final decision",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/scene_thumbnails/frodo's decision_thumb.png"
	},
	scn_15: {
		id: "scn_15",
		name: "gorlum's monologue",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/scene_thumbnails/gorlum's journey_thumb.png"
	},
	scn_17: {
		id: "scn_17",
		name: "fellowship begins",
		type: "scene",
		// width: null,
		parent: null,
		children: []
		// image: ""
	},
	scn_20: {
		id: "scn_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/scene_thumbnails/saving Minas Tirith_thumb.png"
	},
	scn_25: {
		id: "scn_25",
		name: "underground_tomb",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		image: "./static/images/scene_thumbnails/underground_thumb.png"
	}
};

const characterData = {
	chr_05: {
		id: "chr_05",
		name: "Aragorn",
		type: "character",
		image: "./static/images/character_thumbnails/Aragorn_01.png",
		parent: null,
		children: []
	},
	chr_10: {
		id: "chr_10",
		name: "Arwen",
		type: "character",
		// image: "./static/images/character_thumbnails/arwen_01.png",
		parent: null,
		children: []
	},
	chr_15: {
		id: "chr_15",
		name: "Eowyn",
		type: "character",
		image: "./static/images/character_thumbnails/Eowyn_01.png",
		parent: null,
		children: []
	},
	chr_20: {
		id: "chr_20",
		name: "Frodo",
		type: "character",
		image: "./static/images/character_thumbnails/frodo_01.png",
		parent: null,
		children: []
	},
	chr_25: {
		id: "chr_25",
		name: "Gandalf the gray",
		type: "character",
		image: "./static/images/character_thumbnails/gandalf_01.png",
		parent: null,
		children: []
	},
	chr_30: {
		id: "chr_30",
		name: "gollum",
		type: "character",
		image: "./static/images/character_thumbnails/gollum_01.png",
		parent: null,
		children: []
	},
	chr_35: {
		id: "chr_35",
		name: "legolas",
		type: "character",
		image: "./static/images/character_thumbnails/legolas_01.png",
		parent: null,
		children: []
	},
	chr_40: {
		id: "chr_40",
		name: "samwise gamgee",
		type: "character",
		image: "./static/images/character_thumbnails/sam_01.png",
		parent: null,
		children: []
	},
	chr_45: {
		id: "chr_45",
		name: "saruman",
		type: "character",
		image: "./static/images/character_thumbnails/saruman_01.png",
		parent: null,
		children: []
	},
	chr_50: {
		id: "chr_50",
		name: "sauron the terrible",
		type: "character",
		image: "./static/images/character_thumbnails/sauron_01.png",
		parent: null,
		children: []
	},
	chr_51: {
		id: "chr_51",
		name: "theoden",
		type: "character",
		image: "./static/images/character_thumbnails/theoden_01.png",
		parent: null,
		children: []
	}
};
export const initialData = { ...timelineData, ...phaseData, ...characterData, ...sceneData };
// const data = Object.assign({}, timelineData, phaseData, characterData, sceneData);
