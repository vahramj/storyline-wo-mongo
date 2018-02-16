import { SELECT_ASSET } from "./actionTypes";

export function selectAsset(asset){
	return {
		type: SELECT_ASSET,
		payload: asset
	}
}

export const temp = "temp";