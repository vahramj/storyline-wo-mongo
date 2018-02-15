import React, {Component} from "react";
import {string, object, arrayOf} from "prop-types";

import Asset from "./Asset";

import "./styles/AssetCollection.css";
import "./styles/AssetCollection-character.css";
import "./styles/AssetCollection-phase.css";

let data;
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
		return (
			<div 
				className={`asset-collection ${this.state.type}-collection ${this.state.scrollBarsOn}`}
				ref={this.getCollectionElem}
			>
				<ul>
					{this.props.data.map(asset => {
						return (
							<li key={asset.id}>
								<Asset name={asset.name} image={asset.image} type={this.state.type} />
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
	data: arrayOf(object.isRequired).isRequired

};

export default AssetCollection;


