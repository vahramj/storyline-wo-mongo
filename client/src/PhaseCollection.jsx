import React from "react";
import Phase from "./Phase";

import "./styles/PhaseCollection.css";

var phaseData;

const PhaseCollection = () => {
	return (
		<div className="phase-collection">
			<ul>
				{phaseData.map(phase => {
					return (
						<li key={phase.phaseId}>
							<Phase name={phase.name} img={phase.img} />
						</li>
					);
				})}
				<li>
					<div id="add-phase">
						<div className="large-plus-icon">&#43;</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default PhaseCollection;

phaseData = [
	// {
	// 	phaseId: "phs_2",
	// 	name: "prologue",
	// 	img: ""
	// },
	// {
	// 	phaseId: "phs_5",
	// 	name: "shire",
	// 	img: ""
	// },
	{
		phaseId: "phs_7",
		name: "fellowship begins",
		img: "./static/images/phase_thumbnails/fellowship begins_thumb.png"
	},
	{
		phaseId: "phs_10",
		name: "frodo's final decision",
		img: "./static/images/phase_thumbnails/frodo's decision_thumb.png"
	},
	{
		phaseId: "phs_15",
		name: "gorlum's journey",
		img: "./static/images/phase_thumbnails/gorlum's journey_thumb.png"
	},
	{
		phaseId: "phs_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		img: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png"
	},
	{
		phaseId: "phs_25",
		name: "underground_tomb",
		img: "./static/images/phase_thumbnails/underground_thumb.png"
	}
];
