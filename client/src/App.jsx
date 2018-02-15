import React from "react";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import "./styles/App.css";

let data;

const App = ()=>{
	return (
		<div>
			<header id="main-header">
				<h1>Storyline Maker</h1>
			</header>
			<div className="container-holder">
				<div className="asset-containers">
					<AssetContainer type="phase" data={data.phase} />
					<AssetContainer type="scene" data={data.phase} />
					<AssetContainer type="character" data={data.character} />
				</div>
				<TimelineContainer data={data}/>
			</div>
		</div>
	);
};

export default App;

const phaseData = [
	{
		id: "phs_7",
		name: "fellowship begins",
		type: "phase",
		parents: {
			timeline: {
				widthInParent: 0,
				positionInParent: {
					x: 0,
					y: 0,
				}
			}
		},
		childAssets: [],
		image: "./static/images/phase_thumbnails/fellowship begins_thumb.png"
	},
	{
		id: "phs_2",
		name: "prologue",
		type: "phase",
		parents: {},
		childAssets: [],
		// image: ""
	},
	{
		id: "phs_5",
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		type: "phase",
		parents: {},
		childAssets: [],
		image: ""
	},
	{
		id: "phs_10",
		name: "frodo's final decision",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/frodo's decision_thumb.png"
	},
	{
		id: "phs_15",
		name: "gorlum's journey",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/gorlum's journey_thumb.png"
	},
	{
		id: "phs_0",
		name: "fellowship begins",
		type: "phase",
		parents: {},
		childAssets: [],
		// image: ""
	},
	{
		id: "phs_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png"
	},
	{
		id: "phs_25",
		name: "underground_tomb",
		type: "phase",
		parents: {},
		childAssets: [],
		image: "./static/images/phase_thumbnails/underground_thumb.png"
	}
];
const characterData = [
	{
		id: "chr_5",
		name: "Aragorn",
		type: "character",
		image: "./static/images/characters_thumbnails/Aragorn_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_10",
		name: "Arwen",
		type: "character",
		// image: "./static/images/characters_thumbnails/arwen_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_15",
		name: "Eowyn",
		type: "character",
		image: "./static/images/characters_thumbnails/Eowyn_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_20",
		name: "Frodo",
		type: "character",
		image: "./static/images/characters_thumbnails/frodo_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_25",
		name: "Gandalf the gray",
		type: "character",
		image: "./static/images/characters_thumbnails/gandalf_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_30",
		name: "gollum",
		type: "character",
		image: "./static/images/characters_thumbnails/gollum_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_35",
		name: "legolas",
		type: "character",
		image: "./static/images/characters_thumbnails/legolas_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_40",
		name: "samwise gamgee",
		type: "character",
		image: "./static/images/characters_thumbnails/sam_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_45",
		name: "saruman",
		type: "character",
		image: "./static/images/characters_thumbnails/saruman_01.png",
		parents: {},
		childAssets: [],
	},	
	{
		id: "chr_50",
		name: "sauron the terrible",
		type: "character",
		image: "./static/images/characters_thumbnails/sauron_01.png",
		parents: {},
		childAssets: [],
	},
	{
		id: "chr_51",
		name: "theoden",
		type: "character",
		image: "./static/images/characters_thumbnails/theoden_01.png",
		parents: {},
		childAssets: [],
	},
	
];
data = { phase: phaseData, character: characterData };