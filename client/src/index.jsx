import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import rootReducer from "./reducers/rootReducer";
import "./styles/reset.css";
import "./styles/index.css";

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */

render(
	<Provider store={ store }>
		<App />
	</Provider> 
	, document.getElementById("app"));
