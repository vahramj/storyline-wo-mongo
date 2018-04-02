import { actionTypes } from "../utils/constants";

const { SET_CURRENT_IMAGE_DATA } = actionTypes;

const defaultImageData = {
	imageUrl: "",
	imageDisplayData: {
		imageMoveX: 0,
		imageMoveY: 0,
		imageScaleX: 1,
		imageScaleY: 1,
		rotation: 0
	}
};

function currentImageDataReducer(state=defaultImageData, action){
	if(action.type === SET_CURRENT_IMAGE_DATA){
		return {...state, ...action.payload}
	}
	return state;
}

export default currentImageDataReducer;