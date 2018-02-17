
let selectedAsset = null;

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

export function handleSelectAsset(asset){
	selectedAsset = asset;
	console.log("asset selected: ", selectedAsset);
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
		name: "fellowship begins",
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
				id: "scn_01",
				name: "scene for timeline asset",
				type: "scene",
				image: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png",
				parents: {
					"phs_07": {
						widthInParent: 0,
						positionInParent: {
							x: 15,
							y: 0,
						}
					}
				},
				childAssets: []
			},
			{
				id: "scn_02",
				name: "scene 02",
				type: "scene",
				image: "./static/images/phase_thumbnails/gorlum's journey_thumb.png",
				parents: {
					"phs_07": {
						widthInParent: 0,
						positionInParent: {
							x: 145,
							y: 0,
						}
					}
				},
				childAssets: []
			}
		],
		image: "./static/images/phase_thumbnails/fellowship begins_thumb.png"
	},
	{
		id: "phs_02",
		name: "prologue",
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
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		type: "phase",
		parents: {},
		childAssets: [],
		image: ""
	},
	{
		id: "phs_10",
		name: "frodo's final decision",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/frodo's decision_thumb.png"
	},
	{
		id: "phs_15",
		name: "gorlum's journey",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/gorlum's journey_thumb.png"
	},
	{
		id: "phs_0",
		name: "fellowship begins",
		type: "phase",
		parents: {},
		childAssets: [],
		// image: ""
	},
	{
		id: "phs_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png"
	},
	{
		id: "phs_25",
		name: "underground_tomb",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/underground_thumb.png"
	}
];
const characterData = [
	{
		id: "chr_5",
		name: "Aragorn",
		type: "character",
		image: "./static/images/characters_thumbnails/Aragorn_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_10",
		name: "Arwen",
		type: "character",
		// image: "./static/images/characters_thumbnails/arwen_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_15",
		name: "Eowyn",
		type: "character",
		image: "./static/images/characters_thumbnails/Eowyn_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_20",
		name: "Frodo",
		type: "character",
		image: "./static/images/characters_thumbnails/frodo_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_25",
		name: "Gandalf the gray",
		type: "character",
		image: "./static/images/characters_thumbnails/gandalf_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_30",
		name: "gollum",
		type: "character",
		image: "./static/images/characters_thumbnails/gollum_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_35",
		name: "legolas",
		type: "character",
		image: "./static/images/characters_thumbnails/legolas_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_40",
		name: "samwise gamgee",
		type: "character",
		image: "./static/images/characters_thumbnails/sam_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_45",
		name: "saruman",
		type: "character",
		image: "./static/images/characters_thumbnails/saruman_01.png",
		parents: {},
		childAssets: [],
	},	
	{
		id: "chr_50",
		name: "sauron the terrible",
		type: "character",
		image: "./static/images/characters_thumbnails/sauron_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_51",
		name: "theoden",
		type: "character",
		image: "./static/images/characters_thumbnails/theoden_01.png",
		parents: {},
		childAssets: [],
	},
];
let data = { phase: phaseData, character: characterData };

export function getData(){
	return data;
}