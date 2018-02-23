import update from "immutability-helper";

// Vahram, in the function that need it, change data to dataOrig in params
	// and change updatedData to data for ease of read

const assetTypeHierarchy = {
		timeline: {child: "phase", parent: "none"},
		phase: {child: "scene", parent: "timeline"},
		scene: {child: "character", parent: "phase"},
		character: {child: null, parent: "scene"}
};

const headWidthList = {
	timeline: 0,
	phase: 135,
	scene: 135
}

const initialWidthList = {
	phase: 30,
	scene: 0
}

function getPushAmount(asset, rightNeighbour){
	const headWidth = headWidthList[asset.type];
	return asset.position + headWidth + asset.width - rightNeighbour.position
}

function moveAssets(assetArrOrig, amount=0, startIndex=0){
	if(startIndex>=assetArrOrig.length || !amount){
		return assetArrOrig;
	}

	const assetArr = [...assetArrOrig];

	for (let i = startIndex; i < assetArr.length; i++) {
		assetArr[i] = update(assetArr[i], {
			position: {
				$set: assetArr[i].position + amount
			}
		});
	}

	return assetArr;
}

function updateDataFromArray(dataOrig, assetArr){
	let data = dataOrig;
	assetArr.forEach(asset => {
		data = update(data, {
			[asset.id]: {
				$set: asset
			}
		})
	});
	return data;
}

function resizeAssetToFitItsChildren(assetId, data){
	// vahram, later implement tight mode, 
		// where the asset always ends where it last chaild does or initial width
		// have a button on toolbar that turns this on and off
	let asset = data[assetId];

	if(asset.children.length>0){
		const lastChildId = asset.children[asset.children.length-1].id;
		const lastChild = data[lastChildId];

		const childHeadWidth = headWidthList[lastChild.type];
		const tailWidth = asset.type === "timeline" ? 50 : 0;
		const lastChildEnd = lastChild.position + childHeadWidth + lastChild.width + tailWidth;

		const resizeAmount = lastChildEnd - asset.width;
		if(resizeAmount > 0){
			asset = update(asset, {
				width: { 
					$set: asset.width + resizeAmount
				}
			})
		}
	}

	return asset;	
}

function findAssetIndexById(assetId, assetArr){
	let assetIndex = null;
	assetArr.find((asset, index) => {
		if (asset.id === assetId) {
			assetIndex = index;
			return true;
		}
		return false;
	});
	return assetIndex;
}

export function isInsertLegal(sourceType, targetType){
	const legalTargetType = assetTypeHierarchy[sourceType].parent;
	if (legalTargetType === targetType){
		return {
			result: true,
			message: `${sourceType} can be inserted onto a ${targetType}`
		}
	}

	return {
		result: false,
		message: `${sourceType} can be inserted only into ${legalTargetType}`
	}
}

export function setInitialAssetPosition(child, position){
	const parentType = assetTypeHierarchy[child.type].parent;
	const parentHeadWidth = headWidthList[parentType];

	const initialWidth = child.width || initialWidthList[child.type];

	const inBodyPosition = Math.max(position - parentHeadWidth, 0);

	const updatedChild = update(child, {
		width: {$set: initialWidth},
		position: {$set: inBodyPosition}
	});

	return updatedChild;
}

export function insertAssetIntoSiblings( assetOrig, siblingArrOrig ){

	const asset = assetOrig;
	let siblingArr = [...siblingArrOrig];
	const headWidth = headWidthList[asset.type];

	if (siblingArr.length === 0 ) {
		console.log("first asset")
		siblingArr.push(asset);

		return siblingArr;
	}

	// console.log("hello")
	let leftNeighbour; 
	let leftNeighbourIndex;
	let rightNeighbourIndex;
	let rightNeighbour = siblingArr.find((child, index) => {
		if (child.position > asset.position) {
			rightNeighbourIndex = index;
			return true;
		}
		return false;
	});

	// console.log("rightNeighbour: ",rightNeighbour)
	// console.log("rightNeighbourIndex: ",rightNeighbourIndex)
	// console.log("siblingArr: ", siblingArr);
	
	// has both left & right neighbours
	if(rightNeighbour && rightNeighbourIndex>0){
		leftNeighbourIndex = rightNeighbourIndex-1;
		leftNeighbour = siblingArr[leftNeighbourIndex];
		// console.log("has left & right", leftNeighbour)
	}
	// has only left neighbour
	else if(!rightNeighbour) {
		leftNeighbourIndex = siblingArr.length-1;
		leftNeighbour = siblingArr[leftNeighbourIndex];
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

		// vahram, use get push amount
		const pushAmount = asset.position + headWidth + asset.width - rightNeighbour.position;
		if (pushAmount > 0) {
			siblingArr = moveAssets(siblingArr, pushAmount, rightNeighbourIndex)
		}

		insertIndex = rightNeighbourIndex;
	}
	else{
		insertIndex = leftNeighbourIndex+1;
	}

	// console.log("siblingArr: ", siblingArr, "asset: ", asset)
	siblingArr.splice(insertIndex, 0, asset); 

	return siblingArr;
}

export function removeAssetById(assetId, assetArrOrig) {
	const assetArr = [...assetArrOrig];

	const assetIndex = findAssetIndexById(assetId, assetArr);

	if (assetIndex === null) {
		throw new Error(`couldn't find asset with id: ${assetId} in ${JSON.stringify(assetArr)}`);
	}

	assetArr.splice(assetIndex, 1);
	return assetArr;
}

// vahram, change the parameter asset to assetId
export function removeAssetFromItsParent(asset, data){
	const parent = data[asset.parent.id];
	const updatedChildren = removeAssetById(asset.id, parent.children);

	const updatedData = update(data, {
		[asset.parent.id]: {
			children: {
				$set: updatedChildren
			}
		},
		[asset.id]: {
			parent: {
				$set: null
			}
		}
	});

	return updatedData;
}

export function insertAssetIntoParent(asset, parentId, data){
	// map parent's ref children to real ones using updatedData 
	let children = data[parentId].children.map(child=>{
		return data[child.id]
	});
	children = insertAssetIntoSiblings(asset, children);
	// console.log("asset: ", asset, "children: ", children)
	
	let updatedData = data;
	// update all assets that might have new positions
	updatedData = updateDataFromArray(updatedData, children)

	const childrenRefs = children.map(child=>{
		return {id: child.id }
	});
	updatedData = update(updatedData, {
		[parentId]: {
			children: {
				$set: childrenRefs
			}
		},
		[asset.id]: {
			parent: {
				$set: { id: parentId }
			}
		}
	});

	return updatedData;
}

export function resizeAssetToFitTimeline(assetId, dataOrig){
	// vahram, write another resizeAssetToPoint function, that's similar to this
		// but accomodates drag to resize operations
	let data = dataOrig;
	let asset = data[assetId];
	// console.log("asset before resize: ", asset.type, asset.position, asset.width);
	const resizedAsset = resizeAssetToFitItsChildren(asset.id, data)

	if(resizedAsset === asset){
		return data;
	}

	asset = resizedAsset;
	data = update(data, {
		[asset.id]: {
			$set: asset
		}
	});

	if(asset.parent){
		const parent = data[asset.parent.id];
		let siblings = parent.children;

		if(assetId !== siblings[siblings.length-1].id){
			siblings = siblings.map(sibling => data[sibling.id]);
			const assetIndex = findAssetIndexById(asset.id, siblings);

			const pushAmount = getPushAmount(siblings[assetIndex], siblings[assetIndex+1]);
			
			if(pushAmount > 0){
				siblings = moveAssets(siblings, pushAmount, assetIndex+1);
				data = updateDataFromArray(data, siblings);
			}
		}
		// recursively check all parents until reaching timeline's null parent
		data = resizeAssetToFitTimeline(parent.id, data);
	}
	// console.log("asset after resize: ", asset.type, asset.position, asset.width);
	return data;	
}

// // asset mock
// {
// 	id: "asset_id_01",
// 	name: "asset description 01",
// 	type: "assetType01",
// 	parents: "someId",
// // children are sorting based on position
// 	children: [{asset01}, {asset02},...{assetN}],
// 	image: "some/path/to/image.png"
// }

const timelineData = {
	tmln_01: {
		id: "tmln_01",
		type: "timeline",
		width: 1500,
		defaultWidth: false,
		parent: null,
		children: [
			{
				id: "phs_01",
			},
			{
				id: "phs_03",
			},
		],
	}
}

const phaseData = {
	phs_01: {
		id: "phs_01",
		name: "opeining image",
		type: "phase",
		width: 450,
		position: 0,
		parent: {
			id: "tmln_01", 
		},
		children: [
			// {
			// 	id: "scn_05",
			// },
			// {
			// 	id: "scn_08",
			// },
		],
		image: "./static/images/phase_thumbnails/opening image 02_thumb.png"
	},
	phs_03: {
		id: "phs_03",
		name: "setup",
		type: "phase",
		width: 300,
		position: 650,
		// width: null,
		parent: {
			id: "tmln_01",
		},
		children: [
			// {
			// 	id: "scn_20",
			// }
		],
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
	},
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
		children: [],
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
		children: [],
	},
	chr_10: {
		id: "chr_10",
		name: "Arwen",
		type: "character",
		// image: "./static/images/character_thumbnails/arwen_01.png",
		parent: null,
		children: [],
	},
	chr_15: {
		id: "chr_15",
		name: "Eowyn",
		type: "character",
		image: "./static/images/character_thumbnails/Eowyn_01.png",
		parent: null,
		children: [],
	},
	chr_20: {
		id: "chr_20",
		name: "Frodo",
		type: "character",
		image: "./static/images/character_thumbnails/frodo_01.png",
		parent: null,
		children: [],
	},
	chr_25: {
		id: "chr_25",
		name: "Gandalf the gray",
		type: "character",
		image: "./static/images/character_thumbnails/gandalf_01.png",
		parent: null,
		children: [],
	},
	chr_30: {
		id: "chr_30",
		name: "gollum",
		type: "character",
		image: "./static/images/character_thumbnails/gollum_01.png",
		parent: null,
		children: [],
	},
	chr_35: {
		id: "chr_35",
		name: "legolas",
		type: "character",
		image: "./static/images/character_thumbnails/legolas_01.png",
		parent: null,
		children: [],
	},
	chr_40: {
		id: "chr_40",
		name: "samwise gamgee",
		type: "character",
		image: "./static/images/character_thumbnails/sam_01.png",
		parent: null,
		children: [],
	},
	chr_45: {
		id: "chr_45",
		name: "saruman",
		type: "character",
		image: "./static/images/character_thumbnails/saruman_01.png",
		parent: null,
		children: [],
	},	
	chr_50: {
		id: "chr_50",
		name: "sauron the terrible",
		type: "character",
		image: "./static/images/character_thumbnails/sauron_01.png",
		parent: null,
		children: [],
	},
	chr_51: {
		id: "chr_51",
		name: "theoden",
		type: "character",
		image: "./static/images/character_thumbnails/theoden_01.png",
		parent: null,
		children: [],
	},
};
// const data = { timeline: timelineData, phase: phaseData, character: characterData, scene: sceneData };
// const data = { ...timelineData, ...phaseData, ...characterData, ...sceneData };
const data = Object.assign({}, timelineData, phaseData, characterData, sceneData);

export function getData(){
	return data;
}

