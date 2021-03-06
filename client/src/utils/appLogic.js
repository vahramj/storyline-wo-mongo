import update from "immutability-helper";

import { assetTypeHierarchy, headWidthList, initialWidthList, 
	initialData
	 } from "./constants";

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

export function isInsertLegal(sourceType, targetType) {
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

// vahram, change this to makeInitiallyPositionedAsset
export function makeInitiallyPositionedAsset(asset, position) {
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
			insertPosition
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
				// insertPosition = leftNeighbour.position;
				rightNeighbour = leftNeighbour;
				rightNeighbourIndex = leftNeighbourIndex;
				leftNeighbourIndex -= 1;
				leftNeighbour = siblingArr[leftNeighbourIndex];
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
		// console.log("first asset");
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

export function removeAssetById(assetId, assetArrOrig) {
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

export function getChildren(assetId, data) {
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

function pushNeighboursToFitIn(asset, dataOrig){
	// vahram, later, refactor this func or make another similar one to accomodate pushing assets to the left
	let data = dataOrig;
	const parent = data[asset.parent.id];
	const siblingRefs = parent.children;

	if (asset.id !== siblingRefs[siblingRefs.length - 1].id) {
		let siblings = getChildren(parent.id, data);
		const assetIndex = findAssetIndexById(asset.id, siblings);

		const pushAmount = getPushAmount(siblings[assetIndex], siblings[assetIndex + 1]);

		if (pushAmount > 0) {
			siblings = moveAssets(siblings, pushAmount, assetIndex + 1);
			data = updateDataFromArray(data, siblings);
		}
	}
	return data;
}

function resizeAssetToFitTimeline(assetId, dataOrig) {
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
		data = pushNeighboursToFitIn(asset, data)
		// recursively check all parents until reaching timeline's null parent
		data = resizeAssetToFitTimeline(asset.parent.id, data);
	}
	// console.log("asset after resize: ", asset.type, asset.position, asset.width);
	return data;
}

export function insertAsset({ sourceId, targetId, position, data: dataOrig }) {
	let data = dataOrig;
	const source = data[sourceId];
	const target = data[targetId];

	// console.log("source: ", source, "\ntarget: ", target, "\nposition: ", position);

	const legalCheck = isInsertLegal(source.type, target.type);
	if (!legalCheck.result) {
		// alert(legalCheck.message);
		return data;
	}

	if (source.parent) {
		data = removeAssetFromParent(source.id, data);
	}

	const initiallyPositionedAsset = makeInitiallyPositionedAsset(source, position);

	data = insertAssetIntoParent(initiallyPositionedAsset, target.id, data);

	data = resizeAssetToFitTimeline(data[source.id].parent.id, data);

	return data;
}

export function resizeAssetToPosition(assetId, position, dataOrig){
	let data = dataOrig;
	const asset = data[assetId];
	
	let lastChildEnd = 0;
	const children = getChildren(asset.id, data);
	if(children.length > 0){
		const lastChild = children[children.length-1];
		lastChildEnd = lastChild.position + headWidthList[lastChild.type] + lastChild.width;
	}
	
	const headWidth = headWidthList[asset.type];
	const width = Math.max(position - headWidth, lastChildEnd);
	data = update(data, {
		[asset.id]: {
			width: {
				$set: width
			}
		}
	});
	data = pushNeighboursToFitIn(asset, data);
	data = resizeAssetToFitTimeline(asset.parent.id, data);
	return data;
}

export function isTermInAsset(term, asset){
 return asset.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
}

// function moveAsset(assetId, moveAmount, dataOrig) {
// 	let data = dataOrig;
// 	const asset = data[assetId];
// 	const parent = data[asset.parent.id];

// 	const newPosition = Math.max(asset.position + moveAmount, 0);
// 	// console.log("moveAmount: ", moveAmount);
// 	const repositionedAsset = update(asset, {
// 		position: { $set: newPosition }
// 	});

// 	data = removeAssetFromParent(asset.id, data);
// 	data = insertAssetIntoParent(repositionedAsset, parent.id, data);
// 	data = resizeAssetToFitTimeline(parent.id, data);
// 	return data;
// }

// export function getData() {
// 	return initialData;;
// }
