import { combineReducers } from "redux";

import selectAsset from "./reducer_selectAsset";
import updateData from "./reducer_updateData";

const rootReducer = combineReducers({
	selectedAsset: selectAsset,
	assets: updateData
});

export default rootReducer;