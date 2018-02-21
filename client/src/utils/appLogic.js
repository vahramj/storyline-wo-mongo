
let selectedAsset = null;

export function getSelectedAsset(){
	return selectedAsset;
}

// export function handleSelectAsset(asset){
// 	selectedAsset = asset;
// 	console.log("asset selected: ", selectedAsset);
// }

export function addAsset(assetOrig, assetArrOrig, headWidth ){

	const asset = assetOrig;
	const assetArr = [...assetArrOrig];

	if (assetArr.length === 0 ) {
		console.log("first asset")
		assetArr.push(asset);

		return assetArr;
	}

	// console.log("hello")
	let leftNeighbour; 
	let leftNeighbourIndex;
	let rightNeighbourIndex;
	let rightNeighbour = assetArr.find((child, index) => {
		if (child.position > asset.position) {
			rightNeighbourIndex = index;
			return true;
		}
		return false;
	});

	// has both left & right
	// console.log("rightNeighbour: ",rightNeighbour)
	// console.log("rightNeighbourIndex: ",rightNeighbourIndex)
	// console.log("assetArr: ", assetArr);
	if(rightNeighbour && rightNeighbourIndex>0){
		leftNeighbourIndex = rightNeighbourIndex-1;
		leftNeighbour = assetArr[leftNeighbourIndex];
		// console.log("has left & right", leftNeighbour)
	}
	// has only left
	else if(!rightNeighbour) {
		leftNeighbourIndex = assetArr.length-1;
		leftNeighbour = assetArr[leftNeighbourIndex];
		// console.log("has only left", leftNeighbour)
	}

	if(leftNeighbour){
		const leftNeighbourWidth = leftNeighbour.width + headWidth;

		if(leftNeighbour.position + leftNeighbourWidth > asset.position){
			const positionDiff = asset.position - leftNeighbour.position;
			// console.log("positionDiff: ", positionDiff, 'leftNeighbourWidth/2: ', leftNeighbourWidth/2)
			if(positionDiff > leftNeighbourWidth/2){
				asset.position = leftNeighbour.position + leftNeighbourWidth;
			}
			else {
				asset.position = leftNeighbour.position;
				rightNeighbour = leftNeighbour;
				rightNeighbourIndex = leftNeighbourIndex;
			}
		}
	}

	let insertIndex;
	if(rightNeighbour){
		// console.log("has right", rightNeighbour);
		const pushAmount = asset.position + headWidth + asset.width - rightNeighbour.position;
		if (pushAmount > 0) {
			for (let i = rightNeighbourIndex; i < assetArr.length; i++) {
				assetArr[i] = Object.assign({}, assetArr[i], {
					position: assetArr[i].position + pushAmount
				});
			}
		}

		insertIndex = rightNeighbourIndex;
	}
	else{
		insertIndex = leftNeighbourIndex+1;
	}

	// console.log("assetArr: ", assetArr, "asset: ", asset)
	assetArr.splice(insertIndex, 0, asset); 

	return assetArr;
}

// export const assetHierarchy = {
// 		timeline: "phase",
// 		phase: "scene",
// 		scene: "character"
// };

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
// // children are sorting based on position
// 	children: [{asset01}, {asset02},...{assetN}],
// 	image: ""
// },

const timelineData = {
	tmln_01: {
		id: "tmln_01",
		type: "timeline",
		width: 1500,
		defaultWidth: false,
		children: [
			{
				id: "phs_07",
				type: "phase",
				width: 450,
				position: 0,
			},
			{
				id: "phs_30",
				type: "phase",
				width: 300,
				position: 650,
			},
		],
	}
}

const phaseData = {
	phs_07: {
		id: "phs_07",
		name: "opeining image",
		type: "phase",
		children: [
			// {
			// 	id: "scn_05",
			// 	type: "scene",
			// 	width: 0,
			// 	position: 10,
			// },
			// {
			// 	id: "scn_08",
			// 	type: "scene",
			// 	width: 0,
			// 	position: 280,
			// },
		],
		image: "./static/images/phase_thumbnails/opening image 02_thumb.png"
	},
	phs_02: {
		id: "phs_02",
		name: "setup",
		type: "phase",
		children: [
			{
				id: "scn_20",
				type: "scene",
				width: 0,
				position: 160,
			}
		],
		// image: ""
	},
	phs_05: {
		id: "phs_05",
		name: "catalist",
		type: "phase",
		children: [],
		image: "./static/images/phase_thumbnails/catalist 01_thumb.png"
	},
	phs_10: {
		id: "phs_10",
		name: "debate",
		type: "phase",
		children: [],
		image: ""
	},
	phs_15: {
		id: "phs_15",
		name: "breaking into 2",
		type: "phase",
		children: [],
		image: "./static/images/phase_thumbnails/breaking into two 03_thumb.png"
	},
	phs_17: {
		id: "phs_17",
		name: "fun and games",
		type: "phase",
		children: [],
		image: "./static/images/phase_thumbnails/fun and games 03_thumb.png"
	},
	phs_20: {
		id: "phs_20",
		name: "bad guys close in",
		type: "phase",
		children: [],
		image: "./static/images/phase_thumbnails/bad guys close in 05_thumb.png"
	},
	phs_23: {
		id: "phs_23",
		name: "breaking into three",
		type: "phase",
		children: [],
		image: "./static/images/phase_thumbnails/breaking into three 01_thumb.png"
	},
	phs_25: {
		id: "phs_25",
		name: "finaly",
		type: "phase",
		children: [],
		image: "./static/images/phase_thumbnails/fanale 03_thumb.png"
	},	
	phs_30: {
		id: "phs_30",
		name: "closing image",
		type: "phase",
		children: [],
		image: "./static/images/phase_thumbnails/closing image 02_thumb.png"
	},
};

const sceneData = {
	scn_05: {
		id: "scn_05",
		name: "fellowship begins",
		type: "scene",
		children: [],
		image: "./static/images/scene_thumbnails/fellowship begins_thumb.png"
	},
	scn_08: {
		id: "scn_08",
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		type: "scene",
		children: [],
		image: ""
	},
	scn_10: {
		id: "scn_10",
		name: "frodo's final decision",
		type: "scene",
		children: [],
		image: "./static/images/scene_thumbnails/frodo's decision_thumb.png"
	},
	scn_15: {
		id: "scn_15",
		name: "gorlum's monologue",
		type: "scene",
		children: [],
		image: "./static/images/scene_thumbnails/gorlum's journey_thumb.png"
	},
	scn_17: {
		id: "scn_17",
		name: "fellowship begins",
		type: "scene",
		children: [],
		// image: ""
	},
	scn_20: {
		id: "scn_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		type: "scene",
		children: [],
		image: "./static/images/scene_thumbnails/saving Minas Tirith_thumb.png"
	},
	scn_25: {
		id: "scn_25",
		name: "underground_tomb",
		type: "scene",
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
		children: [],
	},
	chr_10: {
		id: "chr_10",
		name: "Arwen",
		type: "character",
		// image: "./static/images/character_thumbnails/arwen_01.png",
		children: [],
	},
	chr_15: {
		id: "chr_15",
		name: "Eowyn",
		type: "character",
		image: "./static/images/character_thumbnails/Eowyn_01.png",
		children: [],
	},
	chr_20: {
		id: "chr_20",
		name: "Frodo",
		type: "character",
		image: "./static/images/character_thumbnails/frodo_01.png",
		children: [],
	},
	chr_25: {
		id: "chr_25",
		name: "Gandalf the gray",
		type: "character",
		image: "./static/images/character_thumbnails/gandalf_01.png",
		children: [],
	},
	chr_30: {
		id: "chr_30",
		name: "gollum",
		type: "character",
		image: "./static/images/character_thumbnails/gollum_01.png",
		children: [],
	},
	chr_35: {
		id: "chr_35",
		name: "legolas",
		type: "character",
		image: "./static/images/character_thumbnails/legolas_01.png",
		children: [],
	},
	chr_40: {
		id: "chr_40",
		name: "samwise gamgee",
		type: "character",
		image: "./static/images/character_thumbnails/sam_01.png",
		children: [],
	},
	chr_45: {
		id: "chr_45",
		name: "saruman",
		type: "character",
		image: "./static/images/character_thumbnails/saruman_01.png",
		children: [],
	},	
	chr_50: {
		id: "chr_50",
		name: "sauron the terrible",
		type: "character",
		image: "./static/images/character_thumbnails/sauron_01.png",
		children: [],
	},
	chr_51: {
		id: "chr_51",
		name: "theoden",
		type: "character",
		image: "./static/images/character_thumbnails/theoden_01.png",
		children: [],
	},
};
let data = { timeline: timelineData, phase: phaseData, character: characterData, scene: sceneData };

export function getData(){
	return data;
}