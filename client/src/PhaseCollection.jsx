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
							<Phase name={phase.name} image={phase.image} />
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
	{
		phaseId: "phs_2",
		name: "prologue"
		// image: ""
	},
	{
		phaseId: "phs_5",
		name: "shire mire hire Gendalf cames gets frodo_to_go_with him and Frodo_goes_on_a_Journey",
		image: ""
	},
	{
		phaseId: "phs_7",
		name: "fellowship begins",
		image: "./static/images/phase_thumbnails/fellowship begins_thumb.png"
	},
	{
		phaseId: "phs_8",
		name: "frodo's final decision"
	},
	{
		phaseId: "phs_0",
		name: "fellowship begins"
	},
	{
		phaseId: "phs_10",
		name: "frodo's final decision",
		image: "./static/images/phase_thumbnails/frodo's decision_thumb.png"
	},
	{
		phaseId: "phs_15",
		name: "gorlum's journey",
		image: "./static/images/phase_thumbnails/gorlum's journey_thumb.png"
	},
	{
		phaseId: "phs_20",
		name: "saving Minas Tirith_saving Minas Tirith",
		image: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png"
	},
	{
		phaseId: "phs_25",
		name: "underground_tomb",
		image: "./static/images/phase_thumbnails/underground_thumb.png"
	}
];
