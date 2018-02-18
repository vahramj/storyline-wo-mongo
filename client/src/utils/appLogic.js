
let selectedAsset = null;

export function getSelectedAsset(){
	return selectedAsset;
}

// export function handleSelectAsset(asset){
// 	selectedAsset = asset;
// 	console.log("asset selected: ", selectedAsset);
// }

export function addAsset(source, target){
	// if doesn't have children
		// add source to target's children
		// add target(id) to source's parents, widhtInParent: 0, positionInParent: {0,0}
	// if has children
		// calculate source's position based on requested position
		// offset children to the right of the source based on it's calculated position and width
		// set new target width
	console.log(`adding ${source} to ${target}`);
}


// // asset mock
// {
// 	id: "asset_id_01",
// 	name: "asset description 01",
// 	type: "assetType01",
// 	parents: {
// 		parentId: {
// 			widthInParent: 0,
// 			positionInParent: {
// 				x: 15,
// 				y: 0,
// 			}
// 		}
// 	},
// // childAssets are sorting based on x coordinate
// 	childAssets: [{asset01}, {asset02},...{assetN}],
// 	image: ""
// },

const phaseData = [
	{
		id: "phs_07",
		name: "opeining image",
		type: "phase",
		parents: {
			timeline: {
				widthInParent: 450,
				positionInParent: {
					x: 0,
					y: 0,
				}
			}
		},
		childAssets: [
			{
				id: "scn_05",
				name: "fellowship begins",
				type: "scene",
				parents: {
					"phs_07": {
						widthInParent: 0,
						positionInParent: {
							x: 15,
							y: 0,
						}
					}
				},
				childAssets: [],
				image: "./static/images/scene_thumbnails/fellowship begins_thumb.png"			},
			{
				id: "scn_08",
				name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
				type: "scene",
				parents: {
					"phs_07": {
						widthInParent: 0,
						positionInParent: {
							x: 150,
							y: 0,
						}
					}
				},
				childAssets: [],
				image: ""
			},
		],
		image: "./static/images/phase_thumbnails/opening image 02_thumb.png"
	},
	{
		id: "phs_02",
		name: "setup",
		type: "phase",
		parents: {
			timeline: {
				widthInParent: 0,
				positionInParent: {
					x: 550,
					y: 0,
				}
			}
		},
		childAssets: [],
		// image: ""
	},
	{
		id: "phs_05",
		name: "catalist",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/catalist 01_thumb.png"
	},
	{
		id: "phs_10",
		name: "debate",
		type: "phase",
		parents: {},
		childAssets: [],
		image: ""
	},
	{
		id: "phs_15",
		name: "breaking into 2",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/breaking into two 03_thumb.png"
	},
	{
		id: "phs_0",
		name: "fun and games",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/fun and games 03_thumb.png"
	},
	{
		id: "phs_20",
		name: "bad guys close in",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/bad guys close in 05_thumb.png"
	},
	{
		id: "phs_23",
		name: "breaking into three",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/breaking into three 01_thumb.png"
	},
	{
		id: "phs_25",
		name: "finaly",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/fanale 03_thumb.png"
	},	
	{
		id: "phs_30",
		name: "closing image",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/closing image 02_thumb.png"
	},
];
const sceneData = [
	{
		id: "scn_05",
		name: "fellowship begins",
		type: "scene",
		parents: {
			"phs_07": {
				widthInParent: 0,
				positionInParent: {
					x: 15,
					y: 0,
				}
			}
		},
		childAssets: [],
		image: "./static/images/scene_thumbnails/fellowship begins_thumb.png"
	},
	{
		id: "scn_08",
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		type: "scene",
		parents: {
			"phs_07": {
				widthInParent: 0,
				positionInParent: {
					x: 150,
					y: 0,
				}
			}
		},
		childAssets: [],
		image: ""
	},
	{
		id: "scn_10",
		name: "frodo's final decision",
		type: "scene",
		parents: {},
		childAssets: [],
		image: "./static/images/scene_thumbnails/frodo's decision_thumb.png"
	},
	{
		id: "scn_15",
		name: "gorlum's monologue",
		type: "scene",
		parents: {},
		childAssets: [],
		image: "./static/images/scene_thumbnails/gorlum's journey_thumb.png"
	},
	{
		id: "scn_0",
		name: "fellowship begins",
		type: "scene",
		parents: {},
		childAssets: [],
		// image: ""
	},
	{
		id: "scn_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		type: "scene",
		parents: {},
		childAssets: [],
		image: "./static/images/scene_thumbnails/saving Minas Tirith_thumb.png"
	},
	{
		id: "scn_25",
		name: "underground_tomb",
		type: "scene",
		parents: {},
		childAssets: [],
		image: "./static/images/scene_thumbnails/underground_thumb.png"
	}
];
const characterData = [
	{
		id: "chr_5",
		name: "Aragorn",
		type: "character",
		image: "./static/images/character_thumbnails/Aragorn_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_10",
		name: "Arwen",
		type: "character",
		// image: "./static/images/character_thumbnails/arwen_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_15",
		name: "Eowyn",
		type: "character",
		image: "./static/images/character_thumbnails/Eowyn_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_20",
		name: "Frodo",
		type: "character",
		image: "./static/images/character_thumbnails/frodo_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_25",
		name: "Gandalf the gray",
		type: "character",
		image: "./static/images/character_thumbnails/gandalf_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_30",
		name: "gollum",
		type: "character",
		image: "./static/images/character_thumbnails/gollum_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_35",
		name: "legolas",
		type: "character",
		image: "./static/images/character_thumbnails/legolas_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_40",
		name: "samwise gamgee",
		type: "character",
		image: "./static/images/character_thumbnails/sam_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_45",
		name: "saruman",
		type: "character",
		image: "./static/images/character_thumbnails/saruman_01.png",
		parents: {},
		childAssets: [],
	},	
	{
		id: "chr_50",
		name: "sauron the terrible",
		type: "character",
		image: "./static/images/character_thumbnails/sauron_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_51",
		name: "theoden",
		type: "character",
		image: "./static/images/character_thumbnails/theoden_01.png",
		parents: {},
		childAssets: [],
	},
];
let data = { phase: phaseData, character: characterData, scene: sceneData };

export function getData(){
	return data;
}