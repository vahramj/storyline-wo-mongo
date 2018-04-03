import React, { Component } from "react";
import { Link } from "react-router-dom";
import { string, shape, number, func } from "prop-types";
import { connect } from "react-redux";

import ContainerHeader from "./ContainerHeader";
import ImageSelector from "./ImageEditor/ImageSelector";

// import uploadImage from "../utils/uploadImage";
import { saveDetails } from "../actions/actionCreators";

import "./styles/DetailContainer.css";

class DetailContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			summary: "",
		};
		const { assetData } = props;
		if(assetData){
			this.state.name = assetData.name;
			this.state.summary = assetData.summary;
		}
	}

	onSubmit = event => {
		event.preventDefault();
		console.log(this.fileInputElem.value);
		console.log(this.fileInputElem.files);
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
		const { imageFile, imageUrl } = this.props.currentImageData;
		const { type } = this.props.match.params;
		const { name, summary } = this.state;
		// upload image to claudinary
		// save the resulting url & display details to asset data
		this.props.saveDetails({
			type,
			name,
			summary,
			image: imageUrl
			// vahram, add display details after the exiting data model works
		});

		this.props.history.push("/");

		// uploadImage(imageFile)
		// 	.then(url => {
		// 		console.log(url);
		// 		this.props.saveDetails({
		// 			type,
		// 			name,
		// 			summary,
		// 			image: url
		// 			// vahram, add display details after the exiting data model works
		// 		})
		// 	})
		// 	.then(() => {
		// 		// console.log("this.props from handleSaveDetails: ", this.props);
		// 		// this.props.history.push("/");
		// 	})
		// 	.catch(err => {
		// 		console.log("error uploading the file", err);
		// 	});
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
									type={type}
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
	}).isRequired,

	history: shape({
		push: func.isRequired
	}).isRequired,

	// vahram, come back to this when coding edit existing asset
	assetData: shape({
		id: string.isRequired,
		name: string.isRequired,
		type: string.isRequired,
		image: string.isRequired
	}),

	currentImageData: shape({
		// imageUrl: string.isRequired,
		imageFile: shape(),
		imageDisplayData: shape({
			imageMoveX: number.isRequired,
			imageMoveY: number.isRequired,
			imageScaleX: number.isRequired,
			imageScaleY: number.isRequired,
			rotation: number.isRequired
		}).isRequired
	}),

	saveDetails: func.isRequired
};

DetailContainer.defaultProps = {
	currentImageData: null,
	assetData: null
}

function mapStateToProps({ currentImageData, assetsData: {data} }, props){
	const { operation, type, id } = props.match.params;
	// console.log(operation, type, id);
	let assetData;
	if(operation === "edit" && id){
		const { name, image } = data[id];
		assetData = {
			id,
			type,
			name,
			image
		}
	}

	return {
		currentImageData,
		assetData
	};
}

export default connect( mapStateToProps, { saveDetails })(DetailContainer);
