import update from "immutability-helper";

export const assetTypeHierarchy = {
	timeline: { child: "phase", parent: "none" },
	phase: { child: "scene", parent: "timeline" },
	scene: { child: "character", parent: "phase" },
	character: { child: null, parent: "scene" }
};

const headWidthList = {
	timeline: 0,
	phase: 135,
	scene: 135
};

const initialWidthList = {
	phase: 30,
	scene: 0,
	character: 0
};

function getPushAmount(asset, rightNeighbour) {
	const headWidth = headWidthList[asset.type];
	return asset.position + headWidth + asset.width - rightNeighbour.position;
}

function moveAssets(assetArrOrig, amount = 0, startIndex = 0) {
	if (startIndex >= assetArrOrig.length || !amount) {
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

function updateDataFromArray(dataOrig, assetArr) {
	let data = dataOrig;
	assetArr.forEach(asset => {
		data = update(data, {
			[asset.id]: {
				$set: asset
			}
		});
	});
	return data;
}

function resizeAssetToFitItsChildren(assetId, data) {
	// vahram, later implement tight mode,
	// where the asset always ends where it last chaild does or initial width
	// have a button on toolbar that turns this on and off
	let asset = data[assetId];

	if (asset.children.length > 0) {
		const lastChildId = asset.children[asset.children.length - 1].id;
		const lastChild = data[lastChildId];

		const childHeadWidth = headWidthList[lastChild.type];
		const tailWidth = asset.type === "timeline" ? 50 : 0;
		const lastChildEnd = lastChild.position + childHeadWidth + lastChild.width + tailWidth;

		const resizeAmount = lastChildEnd - asset.width;
		if (resizeAmount > 0) {
			asset = update(asset, {
				width: {
					$set: asset.width + resizeAmount
				}
			});
		}
	}

	return asset;
}

function findAssetIndexById(assetId, assetArr) {
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

export function selectAsset(id, data) {
	if (!id) {
		return null;
	}
	if (data[id].type === "timeline") {
		return null;
	}
	return id;
}

function isInsertLegal(sourceType, targetType) {
	const legalTargetType = assetTypeHierarchy[sourceType].parent;
	if (legalTargetType === targetType) {
		return {
			result: true,
			message: `${sourceType} can be inserted onto a ${targetType}`
		};
	}

	return {
		result: false,
		message: `${sourceType} can be inserted only into ${legalTargetType}`
	};
}

// vahram, change this to setInitiallyPositionedAsset
export function setInitialAssetPosition(asset, position) {
	const parentType = assetTypeHierarchy[asset.type].parent;
	const parentHeadWidth = headWidthList[parentType];

	const initialWidth = asset.width || initialWidthList[asset.type];

	const inBodyPosition = Math.max(position - parentHeadWidth, 0);

	const updatedAsset = update(asset, {
		width: { $set: initialWidth },
		position: { $set: inBodyPosition }
	});

	return updatedAsset;
}

export function calcInsertPositionIntoSiblings(asset, siblingArr) {
	// const asset = { ...assetOrig };
	let insertPosition = asset.position;
	if (siblingArr.length === 0) {
		return {
			insertPosition,
		};
	}

	const headWidth = headWidthList[asset.type];

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
	if (rightNeighbour && rightNeighbourIndex > 0) {
		leftNeighbourIndex = rightNeighbourIndex - 1;
		leftNeighbour = siblingArr[leftNeighbourIndex];
		// console.log("has left & right", leftNeighbour)
	} else if (!rightNeighbour) {
		// has only left neighbour
		leftNeighbourIndex = siblingArr.length - 1;
		leftNeighbour = siblingArr[leftNeighbourIndex];
		// console.log("has only left", leftNeighbour)
	}

	if (leftNeighbour) {
		const leftNeighbourWidth = leftNeighbour.width + headWidth;

		if (leftNeighbour.position + leftNeighbourWidth > asset.position) {
			const positionDiff = asset.position - leftNeighbour.position;
			// console.log("positionDiff: ", positionDiff, 'leftNeighbourWidth/2: ', leftNeighbourWidth/2)
			if (positionDiff > leftNeighbourWidth / 2) {
				insertPosition = leftNeighbour.position + leftNeighbourWidth;
			} else {
				insertPosition = leftNeighbour.position;
				rightNeighbour = leftNeighbour;
				rightNeighbourIndex = leftNeighbourIndex;
			}
		}
	}
	return {
		insertPosition,
		rightNeighbour,
		rightNeighbourIndex,
		leftNeighbour,
		leftNeighbourIndex
	};
}

function insertAssetIntoSiblings(assetOrig, siblingArrOrig) {
	const asset = { ...assetOrig };
	let siblingArr = [...siblingArrOrig];

	if (siblingArr.length === 0) {
		console.log("first asset");
		siblingArr.push(asset);

		return siblingArr;
	}

	const {
		insertPosition,
		rightNeighbour,
		rightNeighbourIndex,
		leftNeighbourIndex
	} = calcInsertPositionIntoSiblings(asset, siblingArr);

	asset.position = insertPosition;

	let insertIndex;
	if (rightNeighbour) {
		// console.log("has right", rightNeighbour);

		const pushAmount = getPushAmount(asset, rightNeighbour);
		if (pushAmount > 0) {
			siblingArr = moveAssets(siblingArr, pushAmount, rightNeighbourIndex);
		}

		insertIndex = rightNeighbourIndex;
	} else {
		insertIndex = leftNeighbourIndex + 1;
	}

	// console.log("siblingArr: ", siblingArr, "asset: ", asset)
	siblingArr.splice(insertIndex, 0, asset);

	return siblingArr;
}

function removeAssetById(assetId, assetArrOrig) {
	const assetArr = [...assetArrOrig];

	const assetIndex = findAssetIndexById(assetId, assetArr);

	if (assetIndex === null) {
		throw new Error(`couldn't find asset with id: ${assetId} in ${JSON.stringify(assetArr)}`);
	}

	assetArr.splice(assetIndex, 1);
	return assetArr;
}

export function removeAssetFromParent(assetId, dataOrig) {
	let data = dataOrig;
	// console.log(data, assetId);
	const asset = data[assetId];
	const parent = data[asset.parent.id];
	const updatedChildren = removeAssetById(asset.id, parent.children);

	data = update(data, {
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

	return data;
}

export function getChildren(assetId, data){
	const childRefs = data[assetId].children;
	const children = childRefs.map(childRef => data[childRef.id]);
	return children;
}

function insertAssetIntoParent(asset, parentId, dataOrig) {
	let data = dataOrig;
	// map parent's ref children to real ones using updatedData
	let children = getChildren(parentId, data);
	children = insertAssetIntoSiblings(asset, children);
	// console.log("asset: ", asset, "children: ", children)

	// update all assets that might have new positions
	data = updateDataFromArray(data, children);

	const childrenRefs = children.map(child => {
		return { id: child.id };
	});
	data = update(data, {
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

	return data;
}

function resizeAssetToFitTimeline(assetId, dataOrig) {
	// vahram, later, write another resizeAssetToPoint function, that's similar to this
	// but accomodates drag to resize operations
	let data = dataOrig;
	let asset = data[assetId];
	// console.log("asset before resize: ", asset.type, asset.position, asset.width);
	const resizedAsset = resizeAssetToFitItsChildren(asset.id, data);

	if (resizedAsset === asset) {
		return data;
	}

	asset = resizedAsset;
	data = update(data, {
		[asset.id]: {
			$set: asset
		}
	});

	if (asset.parent) {
		const parent = data[asset.parent.id];
		let siblings = parent.children;

		if (assetId !== siblings[siblings.length - 1].id) {
			siblings = siblings.map(sibling => data[sibling.id]);
			const assetIndex = findAssetIndexById(asset.id, siblings);

			const pushAmount = getPushAmount(siblings[assetIndex], siblings[assetIndex + 1]);

			if (pushAmount > 0) {
				siblings = moveAssets(siblings, pushAmount, assetIndex + 1);
				data = updateDataFromArray(data, siblings);
			}
		}
		// recursively check all parents until reaching timeline's null parent
		data = resizeAssetToFitTimeline(parent.id, data);
	}
	// console.log("asset after resize: ", asset.type, asset.position, asset.width);
	return data;
}

export function insertAsset(sourceId, targetId, position, dataOrig) {
	let data = dataOrig;
	const source = data[sourceId];
	const target = data[targetId];

	console.log("source: ", source, "\ntarget: ", target, "\nposition: ", position);

	const legalCheck = isInsertLegal(source.type, target.type);
	if (!legalCheck.result) {
		// alert(legalCheck.message);
		return data;
	}

	if (source.parent) {
		data = removeAssetFromParent(source.id, data);
	}

	const initiallyPositionedAsset = setInitialAssetPosition(source, position);

	data = insertAssetIntoParent(initiallyPositionedAsset, target.id, data);

	data = resizeAssetToFitTimeline(data[source.id].parent.id, data);

	return data;
}

export function moveAsset(assetId, moveAmount, dataOrig) {
	let data = dataOrig;
	const asset = data[assetId];
	const parent = data[asset.parent.id];

	const newPosition = Math.max(asset.position + moveAmount, 0);
	// console.log("moveAmount: ", moveAmount);
	const repositionedAsset = update(asset, {
		position: { $set: newPosition }
	});

	data = removeAssetFromParent(asset.id, data);
	data = insertAssetIntoParent(repositionedAsset, parent.id, data);
	data = resizeAssetToFitTimeline(parent.id, data);
	return data;
}

const timelineData = {
	tmln_01: {
		id: "tmln_01",
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
		width: 450,
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
		image: "./static/images/phase_thumbnails/opening image 02_thumb.png"
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
const data = { ...timelineData, ...phaseData, ...characterData, ...sceneData };
// const data = Object.assign({}, timelineData, phaseData, characterData, sceneData);

export function getData() {
	return data;
}
