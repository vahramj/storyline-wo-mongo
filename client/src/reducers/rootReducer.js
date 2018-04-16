import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import assetsDataReducer from "./assetsDataReducer";
import searchTermReducer from "./searchTermReducer";

const rootReducer = combineReducers({
	"assetsData": assetsDataReducer,
	"searchTerms": searchTermReducer,
	"form": formReducer
});

export default rootReducer;