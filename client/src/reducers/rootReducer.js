import { combineReducers } from "redux";

import assetsDataReducer from "./assetsDataReducer";
import searchTermReducer from "./searchTermReducer";
import currentImageDataReducer from "./currentImageDataReducer";

const rootReducer = combineReducers({
	"assetsData": assetsDataReducer,
	"searchTerms": searchTermReducer,
	"currentImageData": currentImageDataReducer
});

export default rootReducer;