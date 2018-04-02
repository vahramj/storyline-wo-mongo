import React, { Component } from "react";
import { Link } from "react-router-dom";
import { string, shape } from "prop-types";
// import Dropzone from "react-dropzone";

import ContainerHeader from "./ContainerHeader";
import ImageSelector from "./ImageEditor/ImageSelector";

import uploadImage from "../utils/uploadImage";

import "./styles/DetailContainer.css";

class DetailContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			summary: "",
			imageData: null
		};
	}

	onSubmit = event => {
		event.preventDefault();
		console.log(this.fileInputElem.value);
		console.log(this.fileInputElem.files);
	};

	onImageChange = event => {
		console.log(event.target.files);
	};

	setImageData = imageData => {
		this.setState({
			imageData
		});
	};

	handleNameChange = event => {
		this.setState({
			name: event.target.value
		});
	};

	handleSummaryChange = event => {
		this.setState({
			summary: event.target.value
		});
	};

	handleSaveDetails = event => {
		event.preventDefault();
		console.log("saving details")
	};

	uploadImage = files => {
		// this.setState({
		// 	image: "uploading"
		// });

		uploadImage(files[0])
			.then(url => {
				console.log(url);
				// this.setState({
				// 	imageUrl: url
				// });
			})
			.catch(err => {
				console.log("error uploading the file", err);
			});
	};

	render() {
		const { type, operation } = this.props.match.params;
		// console.log(this.props);

		return (
			<div className="detail-container">
				<ContainerHeader headerText={`${operation} ${type}`} />
				<div className="container-body">
					<form onSubmit={this.onSubmit}>
						<fieldset>
							<label htmlFor="name">
								<h3> Name for phase </h3>
								<input
									type="text"
									id="name"
									name="name"
									value={this.state.name}
									onChange={this.handleNameChange}
								/>
							</label>
						</fieldset>

						<fieldset>
							<label htmlFor="summary">
								<h3>Summary</h3>
								<textarea
									type="text"
									id="summary"
									name="summary"
									cols="60"
									rows="10"
									value={this.state.summary}
									onChange={this.handleSummaryChange}
								/>
							</label>
						</fieldset>

						<fieldset>
							<label htmlFor="file">
								<h3>Select image</h3>
								<ImageSelector
									type={this.props.match.params.type}
									setImageData={this.setImageData}
								/>
							</label>
						</fieldset>

						<fieldset>
							<div className="btns">
								<button className="btn btn-primary" onClick={this.handleSaveDetails}>save</button>
								<Link className="btn btn-danger" to="/">
									cancel
								</Link>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}
}

DetailContainer.propTypes = {
	match: shape({
		params: shape({
			operation: string.isRequired,
			type: string.isRequired
		}).isRequired
	}).isRequired
};

export default DetailContainer;
