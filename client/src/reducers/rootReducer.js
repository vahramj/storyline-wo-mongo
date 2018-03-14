import { combineReducers } from "redux";

import assetsDataReducer from "./assetsDataReducer";
import searchTermReducer from "./searchTermReducer";

const rootReducer = combineReducers({
	"assetsData": assetsDataReducer,
	"searchTerms": searchTermReducer
});

export default rootReducer;