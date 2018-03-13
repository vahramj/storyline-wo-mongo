import { combineReducers } from "redux";

import assetsDataReducer from "./assetsDataReducer";
import { actionTypes } from "../utils/constants";

const { SET_SCENE_SEARCH_TERM } = actionTypes;

function sceneSearchTermReducer(state="", action){
	if(action.type === SET_SCENE_SEARCH_TERM){
		return action.payload;
	}
	return state;
}

const rootReducer = combineReducers({
	"assetsData": assetsDataReducer,
	"sceneSearchTerm": sceneSearchTermReducer
});

export default rootReducer;