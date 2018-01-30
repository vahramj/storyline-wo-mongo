import React from "react";
import "./styles/AssetContainer.css";

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
			</section>
		</div>
	);
};

export default AssetContainer;