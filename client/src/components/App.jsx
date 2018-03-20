import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import rootReducer from "../reducers/rootReducer";
import ContainerHolder from "./ContainerHolder";
import DetailContainer from "./DetailContainer";
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
			<BrowserRouter>
				<Provider store={store}>
					<div>
						<header id="main-header">
							<h1>Storyline Maker</h1>
						</header>
						<div className="main">
							<Switch>
								<Route path="/details/:operation/:type" component={ DetailContainer } />
								<Route path="/" component={ ContainerHolder } />
							</Switch>
						</div>
						<CustomDragLayer /> 
					</div>
				</Provider>
			</BrowserRouter>
		);
	}
};

export default DragDropContext(HTML5Backend)(App);

