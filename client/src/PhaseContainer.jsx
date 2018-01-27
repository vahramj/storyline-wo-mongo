import React from "react";

const PhaseContainer = ()=>{
	return (
		<div>
			<header>
				<h2>phases</h2>
				<div className="small plus icon"/>
			</header>
			<input type="text" placeholse="search" />
			<ul>
				<li>
					<div className="phase">phase Name 1</div>
				</li>
				<li>
					<div className="phase">phase Name 2</div>
				</li>
				<li>
					<div className="phase">phase Name 3</div>
				</li>
				<li>
					<div id="addPhase">add phase icon</div>
				</li>
			</ul>
		</div>
	);
};

export default PhaseContainer;