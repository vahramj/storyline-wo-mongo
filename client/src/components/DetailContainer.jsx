import React from "react";

import "./styles/DetailContainer.css";

const DetailContainer = (props)=>{
	return (
		<div className="detail-container">
		
			<header>
				<div className="h2Wrapper">
					<h2>{`add phase`.toUpperCase()}</h2>
				</div>
			</header>
			<div className="container-body">
				<form>
					<label htmlFor="summary">
						<span>Summary</span>
						<textarea type="text" id="summary" name="summary"/>
					</label>
					<br/>
					<label htmlFor="name" > 
						<span> Name for phase </span> 
						<input id="name" type="text" name="name" />
					</label>
					<br/>
					<button> add </button>
					<a href="">cancel</a>
				</form>
			</div>
		</div>
	)
}

export default DetailContainer;
