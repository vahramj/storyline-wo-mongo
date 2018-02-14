import React, {Component} from "react";
import {string} from "prop-types";

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
		this.state = {data: data[this.props.type], type: assetTypes[this.props.type]}
	}

	componentDidMount(){
		this.checkScrollBars();
	};

	getCollectionElem = collection => {this.collection = collection};

	checkScrollBars = () => {
		let scrollBarsOn;
		if(this.collection.clientWidth === this.collection.offsetWidth){
			console.log("scroll bars are off");
			scrollBarsOn = "scroll-bars-off";
		}
		else{
			console.log("scroll bars are on");
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
					{this.state.data.map(asset => {
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
	type: string.isRequired
};

export default AssetCollection;

const phaseData = [
	{
		id: "phs_7",
		name: "fellowship begins",
		image: "./static/images/phase_thumbnails/fellowship begins_thumb.png"
	},
	{
		id: "phs_2",
		name: "prologue"
		// image: ""
	},
	{
		id: "phs_5",
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		image: ""
	},
	{
		id: "phs_10",
		name: "frodo's final decision",
		image: "./static/images/phase_thumbnails/frodo's decision_thumb.png"
	},
	{
		id: "phs_15",
		name: "gorlum's journey",
		image: "./static/images/phase_thumbnails/gorlum's journey_thumb.png"
	},
	{
		id: "phs_0",
		name: "fellowship begins"
	},
	{
		id: "phs_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		image: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png"
	},
	{
		id: "phs_25",
		name: "underground_tomb",
		image: "./static/images/phase_thumbnails/underground_thumb.png"
	}
];
const characterData = [
	{
		id: "chr_5",
		name: "Aragorn",
		image: "./static/images/characters_thumbnails/Aragorn_01.png"
	},
	{
		id: "chr_10",
		name: "Arwen",
		// image: "./static/images/characters_thumbnails/arwen_01.png"
	},
	{
		id: "chr_15",
		name: "Eowyn",
		image: "./static/images/characters_thumbnails/Eowyn_01.png"
	},
	{
		id: "chr_20",
		name: "Frodo",
		image: "./static/images/characters_thumbnails/frodo_01.png"
	},
	{
		id: "chr_25",
		name: "Gandalf the gray",
		image: "./static/images/characters_thumbnails/gandalf_01.png"
	},
	{
		id: "chr_30",
		name: "gollum",
		image: "./static/images/characters_thumbnails/gollum_01.png"
	},
	{
		id: "chr_35",
		name: "legolas",
		image: "./static/images/characters_thumbnails/legolas_01.png"
	},
	{
		id: "chr_40",
		name: "samwise gamgee",
		image: "./static/images/characters_thumbnails/sam_01.png"
	},
	{
		id: "chr_45",
		name: "saruman",
		image: "./static/images/characters_thumbnails/saruman_01.png"
	},	
	{
		id: "chr_50",
		name: "sauron the terrible",
		image: "./static/images/characters_thumbnails/sauron_01.png"
	},
	{
		id: "chr_51",
		name: "theoden",
		image: "./static/images/characters_thumbnails/theoden_01.png"
	},
	
];

data = {
	phase: phaseData,
	scene: phaseData,
	character: characterData
};

