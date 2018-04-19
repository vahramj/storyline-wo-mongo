import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

/* eslint-disable no-underscore-dangle */
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer, 
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	)
);
/* eslint-enable */

export default store;