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

	FETCH_ASSETS: "FETCH_ASSETS"
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
		],
		imageData: null
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
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/opening image 02_thumb.png",
			imageDisplayData: {
				imageMoveX: -40,
				imageMoveY: -15,
				imageScaleX: 0.7,
				imageScaleY: 0.7,
				rotation: 0
			}
		}
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
		],
		imageData: null
	},
	phs_05: {
		id: "phs_05",
		name: "catalist",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/catalist 01_thumb.png",
			imageDisplayData: {
				imageMoveX: -41,
				imageMoveY: -15,
				imageScaleX: 0.7,
				imageScaleY: 0.7,
				rotation: 0
			}
		}
	},
	phs_10: {
		id: "phs_10",
		name: "debate",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: null
	},
	phs_15: {
		id: "phs_15",
		name: "breaking into 2",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/breaking into two 02_thumb.png",
			imageDisplayData: {
				imageMoveX: -34,
				imageMoveY: -15,
				imageScaleX: 0.7,
				imageScaleY: 0.7,
				rotation: 0
			}
		}
	},
	phs_17: {
		id: "phs_17",
		name: "fun and games",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/fun and games 03_thumb.png",
			imageDisplayData: {
				imageMoveX: -33,
				imageMoveY: -14,
				imageScaleX: 0.8,
				imageScaleY: 0.8,
				rotation: 0
			}
		}
	},
	phs_20: {
		id: "phs_20",
		name: "bad guys close in",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/bad guys close in 05_thumb.png",
			imageDisplayData: {
				imageMoveX: -45,
				imageMoveY: -15,
				imageScaleX: 0.7,
				imageScaleY: 0.7,
				rotation: 0
			}
		}
	},
	phs_23: {
		id: "phs_23",
		name: "breaking into three",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/breaking into three 01_thumb.png",
			imageDisplayData: {
				imageMoveX: -46,
				imageMoveY: -15,
				imageScaleX: 0.7,
				imageScaleY: 0.7,
				rotation: 0
			}
		}
	},
	phs_25: {
		id: "phs_25",
		name: "finaly",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/fanale 03_thumb.png",
			imageDisplayData: {
				imageMoveX: -34,
				imageMoveY: -9,
				imageScaleX: 1,
				imageScaleY: 1,
				rotation: 0
			}
		}
	},
	phs_30: {
		id: "phs_30",
		name: "closing image",
		type: "phase",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/phase_thumbnails/closing image 02_thumb.png",
			imageDisplayData: {
				imageMoveX: -27,
				imageMoveY: -17,
				imageScaleX: 0.8,
				imageScaleY: 0.8,
				rotation: 0
			}
		}
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
		imageData: {
			imageUrl: "/static/images/scene_thumbnails/fellowship begins_thumb.png",
			imageDisplayData: {
				imageMoveX: -4.5,
				imageMoveY: -13,
				imageScaleX: 0.93,
				imageScaleY: 0.93,
				rotation: 0
			}
		}
	},
	scn_08: {
		id: "scn_08",
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		imageData: null
	},
	scn_10: {
		id: "scn_10",
		name: "frodo's final decision",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/scene_thumbnails/frodo's decision_thumb.png",
			imageDisplayData: {
				imageMoveX: -48,
				imageMoveY: -15,
				imageScaleX: 0.7,
				imageScaleY: 0.7,
				rotation: 0
			}
		}
	},
	scn_15: {
		id: "scn_15",
		name: "gorlum's monologue",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/scene_thumbnails/gorlum's journey_thumb.png",
			imageDisplayData: {
				imageMoveX: -13,
				imageMoveY: -15,
				imageScaleX: 0.85,
				imageScaleY: 0.85,
				rotation: 0
			}
		}
	},
	scn_17: {
		id: "scn_17",
		name: "fellowship begins",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		imageData: null
	},
	scn_20: {
		id: "scn_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/scene_thumbnails/saving Minas Tirith_thumb.png",
			imageDisplayData: {
				imageMoveX: -26.5,
				imageMoveY: -15,
				imageScaleX: 0.73,
				imageScaleY: 0.73,
				rotation: 0
			}
		}
	},
	scn_25: {
		id: "scn_25",
		name: "underground_tomb",
		type: "scene",
		// width: null,
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/scene_thumbnails/underground_thumb.png",
			imageDisplayData: {
				imageMoveX: -26.5,
				imageMoveY: -15,
				imageScaleX: 0.73,
				imageScaleY: 0.73,
				rotation: 0
			}
		}
	}
};

const characterData = {
	chr_05: {
		id: "chr_05",
		name: "Aragorn",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/Aragorn_01.png",
			imageDisplayData: {
				imageMoveX: -36,
				imageMoveY: -58,
				imageScaleX: 0.52,
				imageScaleY: 0.52,
				rotation: 0
			}
		}
	},
	chr_10: {
		id: "chr_10",
		name: "Arwen",
		type: "character",
		parent: null,
		children: [],
		imageData: null
	},
	chr_15: {
		id: "chr_15",
		name: "Eowyn",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/Eowyn_01.png",
			imageDisplayData: {
				imageMoveX: -165,
				imageMoveY: -99,
				imageScaleX: 0.3,
				imageScaleY: 0.3,
				rotation: 0
			}
		}
	},
	chr_20: {
		id: "chr_20",
		name: "Frodo",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/frodo_01.png",
			imageDisplayData: {
				imageMoveX: -51,
				imageMoveY: -36,
				imageScaleX: 0.55,
				imageScaleY: 0.55,
				rotation: 0
			}
		}
	},
	chr_25: {
		id: "chr_25",
		name: "Gandalf the gray",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/gandalf_01.png",
			imageDisplayData: {
				imageMoveX: -36,
				imageMoveY: -17,
				imageScaleX: 0.7,
				imageScaleY: 0.7,
				rotation: 0
			}
		}
	},
	chr_30: {
		id: "chr_30",
		name: "gollum",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/gollum_01.png",
			imageDisplayData: {
				imageMoveX: -36,
				imageMoveY: -36,
				imageScaleX: 0.52,
				imageScaleY: 0.52,
				rotation: 0
			}
		}
	},
	chr_35: {
		id: "chr_35",
		name: "legolas",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/legolas_01.png",
			imageDisplayData: {
				imageMoveX: -40,
				imageMoveY: -45,
				imageScaleX: 0.6,
				imageScaleY: 0.6,
				rotation: 0
			}
		}
	},
	chr_40: {
		id: "chr_40",
		name: "samwise gamgee",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/sam_01.png",
			imageDisplayData: {
				imageMoveX: -83,
				imageMoveY: -36,
				imageScaleX: 0.52,
				imageScaleY: 0.52,
				rotation: 0
			}
		}
	},
	chr_45: {
		id: "chr_45",
		name: "saruman",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/saruman_01.png",
			imageDisplayData: {
				imageMoveX: -61,
				imageMoveY: -36,
				imageScaleX: 0.52,
				imageScaleY: 0.52,
				rotation: 0
			}
		}
	},
	chr_50: {
		id: "chr_50",
		name: "sauron the terrible",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/sauron_01.png",
			imageDisplayData: {
				imageMoveX: -36,
				imageMoveY: -58,
				imageScaleX: 0.52,
				imageScaleY: 0.52,
				rotation: 0
			}
		}
	},
	chr_51: {
		id: "chr_51",
		name: "theoden",
		type: "character",
		parent: null,
		children: [],
		imageData: {
			imageUrl: "/static/images/character_thumbnails/theoden_01.png",
			imageDisplayData: {
				imageMoveX: -65,
				imageMoveY: -36,
				imageScaleX: 0.52,
				imageScaleY: 0.52,
				rotation: 0			}
		}
	}
};
 // const initialData = { ...timelineData, ...phaseData, ...characterData, ...sceneData };

// const data = Object.assign({}, timelineData, phaseData, characterData, sceneData);
