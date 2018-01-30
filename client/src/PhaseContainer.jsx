import React from "react";
import Phase from "./Phase";
import "./styles/AssetContainer.css";

const phaseData = [
	{
		phaseId: "phs_5",
		name: "fellowship begins",
		img: "./static/images/fellowship begins_thumb.png"
	},
	{
		phaseId: "phs_10",
		name: "frodo's decision",
		img: "./static/images/frodo's decision_thumb.png"
	},
	// {
	// 	phaseId: "phs_15",
	// 	name: "gorlum's journey",
	// 	img: "./static/images/gorlum's journey_thumb.png"
	// },
	// {
	// 	phaseId: "phs_20",
	// 	name: "saving Minas Tirith",
	// 	img: "./static/images/saving Minas Tirith_thumb.png"
	// },
	{
		phaseId: "phs_25",
		name: "underground_tomb",
		img: "./static/images/underground_thumb.png"
	}
]

const AssetContainer = ()=>{
	return (
		<div className="asset-container">
			<header>
				<div className="h2Wrapper">
					<h2>phases</h2>
				</div>
				<div className="small-plus-icon" />
			</header>
			<section className="container-body">
				<input type="text" placeholder="search" />
				<ul>
					{phaseData.map(phase=><li><Phase key={phase.phs_id} name={phase.name} img={phase.img} /></li>)}
					<li>
						<div id="addPhase">
							<div className="large-plus-icon">&#43;</div>
							{/* <span>&#43;</span> */}
						</div>
					</li>
				</ul>
			</section>
		</div>
	);
};

export default AssetContainer;