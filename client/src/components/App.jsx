import React, { Component } from "react";
import { Provider } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";

import CustomDragLayer from "./CustomDragLayer";
// import TimelineView from "./TimelineView";
// import DetailsContainer from "./DetailsContainer/DetailsContainer";
import Project from "./Project";

import store from "../reducers/store";

import "./styles/App.css";


// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║   
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║   
// ██║  ██║███████╗██║  ██║╚██████╗   ██║   
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   

// console.log("hello")

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
						<Project />
						<CustomDragLayer /> 
					</div>
				</Provider>
			</BrowserRouter>
		);
	}
};

export default DragDropContext(HTML5Backend)(App);

