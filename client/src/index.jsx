import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import rootReducer from "./reducers/rootReducer";
import "./styles/reset.css";
import "./styles/index.css";

render(
	<Provider store={ createStore(rootReducer) }>
		<App />
	</Provider> 
	, document.getElementById("app"));
