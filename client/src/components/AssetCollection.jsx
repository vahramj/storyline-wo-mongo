import React, {Component} from "react";
import {string, shape} from "prop-types";
// import {connect} from "react-redux";

import Asset from "./Asset";

import "./styles/AssetCollection.css";
import "./styles/AssetCollection-character.css";
import "./styles/AssetCollection-phase.css";

class AssetCollection extends Component {
	constructor(props){
		super(props);
		this.state = {scrollBarsStatus: "scroll-bars-off"}
	}

	componentDidMount(){
		this.checkScrollBars();
	};

	getCollectionElem = collection => {this.collection = collection};

	checkScrollBars = () => {
		let scrollBarsStatus;
		if(this.collection.clientWidth === this.collection.offsetWidth){
			// console.log("scroll bars are off");
			scrollBarsStatus = "scroll-bars-off";
		}
		else{
			// console.log("scroll bars are on");
			scrollBarsStatus = "scroll-bars-on";
		}
		this.setState({scrollBarsStatus})
	};

	render(){
		const {data, type} = this.props;
		const collectionData = Object.keys(data[type]).map(id => data[type][id]);
		const styleType = type === "character" ? "character" : "phase";

		return (
			<div 
				className={`asset-collection ${styleType}-collection ${this.state.scrollBarsStatus}`}
				ref={this.getCollectionElem}
			>
				<ul>
					{collectionData.map(assetData => {
						return (
							<li key={assetData.id}>
								<Asset {...this.props} assetData={assetData} />
							</li>
						);
					})}

					<li>
						<div id="add-asset">
							<div className="large-plus-icon">&#43;</div>
						</div>
					</li>
				</ul>
			</div>
		);
	}
};

AssetCollection.propTypes = {
	type: string.isRequired,
	data: shape({
		// timeline: shape(object.isRequired).isRequired,
		// phase: shape(object.isRequired).isRequired,
		// scene: shape(object.isRequired).isRequired,
		// character: shape(object.isRequired).isRequired
	}).isRequired,
	// assets: arrayOf(object.isRequired).isRequired,

};

// function mapStateToProps(state){
// 	// console.log(state.assets);
// 	return {
// 		data: state.assets
// 		// assets: state.assets.
// 	}
// }

// export default connect(mapStateToProps)(AssetCollection);
export default AssetCollection;



