import React, {Component} from "react";
import {string, shape, object, arrayOf} from "prop-types";
// import {connect} from "react-redux";

import Asset from "./Asset";

import "./styles/AssetCollection.css";
import "./styles/AssetCollection-character.css";
import "./styles/AssetCollection-phase.css";

// let data;
const assetTypes = {
	phase: "phase",
	scene: "phase",
	character: "character"
};

class AssetCollection extends Component {
	constructor(props){
		super(props);
		this.state = {type: assetTypes[this.props.type]}
	}

	componentDidMount(){
		this.checkScrollBars();
	};

	getCollectionElem = collection => {this.collection = collection};

	checkScrollBars = () => {
		let scrollBarsOn;
		if(this.collection.clientWidth === this.collection.offsetWidth){
			// console.log("scroll bars are off");
			scrollBarsOn = "scroll-bars-off";
		}
		else{
			// console.log("scroll bars are on");
			scrollBarsOn = "scroll-bars-on";
		}
		this.setState({scrollBarsOn})
	};

	render(){
		const {data} = this.props;
		// console.log(data)
		return (
			<div 
				className={`asset-collection ${this.state.type}-collection ${this.state.scrollBarsOn}`}
				ref={this.getCollectionElem}
			>
				<ul>
					{data[this.state.type].map(assetData => {
						return (
							<li key={assetData.id}>
								<Asset {...this.props} data={assetData} />
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
		phase: arrayOf(object.isRequired).isRequired,
		character: arrayOf(object.isRequired).isRequired
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



