import React, { Component } from "react";
import { number, string, func, bool, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";

import TimelineBody from "./TimelineBody";
import { handleTimelineClick, fitTimelineToFrame } from "../actions/actionCreators";

import "./styles/Timeline.css";

class Timeline extends Component {
	componentDidMount() {
		this.setDefaultWidth();
		window.addEventListener("resize", this.setDefaultWidth)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.setDefaultWidth)
	}

	onClickHandler = (event) => {
		const { timelineId } = this.props;;

		event.stopPropagation();
		this.props.handleTimelineClick(event, timelineId );
	};

	setDefaultWidth = () => {
		const { defaultWidth, width, timelineId } = this.props;

		if(defaultWidth){
			const timelineFrameWidth = this.timelineElem.getBoundingClientRect().width;
			// vahram, this check is for tight resize, which we will come back to later
			if(timelineFrameWidth > width){
				this.props.fitTimelineToFrame(timelineFrameWidth, timelineId);
			}
		}		
	}

	render() {
		const { width, childAssets } = this.props;

		return (
			<div
				className="timeline"
				ref={elem => {
					this.timelineElem = elem;
				}}
			>
				<div
					className="scroll-body"
					role="none"
					onClick={ this.onClickHandler }
					style={{ width }}
				>
					<TimelineBody childAssets={ childAssets } width={ width } />
				</div>
			</div>
		);
	}
}

Timeline.propTypes = {
	timelineId: string.isRequired,
	width: number.isRequired,
	defaultWidth: bool,
	handleTimelineClick: func,
	fitTimelineToFrame: func,
	childAssets: arrayOf(
		shape({
			id:string
		})
	).isRequired
};

Timeline.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, Timeline scroll-body click handler hasn't been setup ");
	},
	fitTimelineToFrame: () => {
		console.log("Vahram, update timeline width to fit the frame");
	},
	defaultWidth: false,
};

function mapDispatchToProps(dispatch){
	return {
		handleTimelineClick(event, assetId){
			return dispatch(handleTimelineClick(event, assetId));
		},
		fitTimelineToFrame(timelineFrameWidth, timelineId){
			return dispatch(fitTimelineToFrame(timelineFrameWidth, timelineId));
		}
	}
}

function mapStateToProps({data}){
	const timelineId = "tmln_01";
	const timelineAsset = data[timelineId];
	const { width, defaultWidth, children } = timelineAsset;

	return {
		timelineId,
		width, 
		defaultWidth, 
		childAssets: children
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
