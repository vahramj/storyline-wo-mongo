import React, { Component } from "react";
import { connect } from "react-redux"
import { Switch, Route, withRouter } from "react-router-dom";
import { func } from "prop-types";
import _ from "lodash";

import TimelineView from "./TimelineView";
import DetailsContainer from "./DetailsContainer/DetailsContainer";

import { fetchAssetsData } from "../actions/networkActionCreators";

class Project extends Component {
	componentDidMount(){
		this.props.fetchAssetsData();
	}
	render(){
		return (
			<Switch>
				<Route path="/:operation/:type/:id?" component={ DetailsContainer } />
				<Route path="/" component={ TimelineView } />
			</Switch>
		);
	}
}

Project.propTypes={
	fetchAssetsData: func.isRequired
}

const decorator = _.flowRight([
	withRouter,
	connect( null, {fetchAssetsData} ),
])
export default decorator(Project);