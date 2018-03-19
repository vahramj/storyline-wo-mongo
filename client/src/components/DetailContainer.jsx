import React from "react";
import { Link } from "react-router-dom";

import "./styles/DetailContainer.css";

const DetailContainer = props => {
	return (
		<div className="detail-container">
			<header>
				<div className="h2Wrapper">
					<h2>{`add phase`.toUpperCase()}</h2>
				</div>
			</header>
			<div className="container-body">
				<form>
					<fieldset>
						<label htmlFor="name">
							<p> Name for phase </p>
							<input type="text" id="name" name="name" />
						</label>
					</fieldset>

					<fieldset>
						<label htmlFor="summary">
							<p>Summary</p>
							<textarea type="text" id="summary" name="summary" cols="60" rows="10" />
						</label>
					</fieldset>

					<fieldset>
						<label htmlFor="file">
								<p>select image</p>
								<input type="file" id="imageFile" name="imageFile" />
						</label>

{ /*
						<label htmlFor="image-url">
							<fieldset>
								<p>
									<input type="radio" name="imageInput" />
									<span>Image url</span>
								</p>
								<input type="text" id="image-url" size="60" name="imageUrl" />
							</fieldset>
						</label>
*/ }
					</fieldset>

					<fieldset>
						<div className="btns">
							<button className="btn btn-primary"> add </button>						
							<Link className="btn btn-danger" to="/">cancel</Link>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default DetailContainer;
