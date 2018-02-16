import { SELECT_ASSET } from "../actions/actionTypes";

const selectAsset = (state = null, action) => {
	switch (action.type) {
		case SELECT_ASSET:
			console.log("selected asset:", action.payload);
			return action.payload;
		default:
			return state;
	}
};

export default selectAsset;