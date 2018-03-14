import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import rootReducer from "../reducers/rootReducer";
import ContainerHolder from "./ContainerHolder";
import AssetDetails from "./AssetDetails";
import CustomDragLayer from "./CustomDragLayer";

import "./styles/App.css";


// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║   
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║   
// ██║  ██║███████╗██║  ██║╚██████╗   ██║   
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

class App extends Component {
	componentDidMount(){

	}
	render(){
		return (
			<Provider store={store}>
				<div>
					<header id="main-header">
						<h1>Storyline Maker</h1>
					</header>
					<ContainerHolder />
					<AssetDetails />
					<CustomDragLayer /> 
				</div>
			</Provider>
		);
	}
};

export default DragDropContext(HTML5Backend)(App);

