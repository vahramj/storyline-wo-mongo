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
			imageData: {
				imageUrl: "",
				imageDisplayData: {
					imageMoveX: 0,
					imageMoveY: 0,
					imageScaleX: 1,
					imageScaleY: 1,
					rotation: 0
				}
			}
		};

		const { assetData } = props;
		if(assetData){
			this.state.name = assetData.name;
			this.state.summary = assetData.summary;
			if(assetData.imageData){
				this.state.imageData = assetData.imageData;
			}
		}
	};

	componentDidMount(){
		const { operation, type } = this.props.match.params;
		const { assetData } = this.props;
		if( operation === "edit" && !assetData){
			this.props.history.push(`/add/${type}`);
		}
	}

	// ██╗   ██╗████████╗██╗██╗     ███████╗
	// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
	// ██║   ██║   ██║   ██║██║     ███████╗
	// ██║   ██║   ██║   ██║██║     ╚════██║
	// ╚██████╔╝   ██║   ██║███████╗███████║
	//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

	setImageData = (newImageData) => {
		this.setState({ imageData: { ...this.state.imageData, ...newImageData }});
	};

	// ███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗  ██╗██████╗ ██╗     ███████╗
	// ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║  ██║██╔══██╗██║     ██╔════╝
	// █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ███████║██║  ██║██║     ███████╗
	// ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██╔══██║██║  ██║██║     ╚════██║
	// ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ██║  ██║██████╔╝███████╗███████║
	// ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝

	handleSubmitForm = (event) => {
		event.preventDefault();
		console.log("vahram, DetailContainer form just got submitted, figure why. It shouldn't");
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

		let { imageData } = this.state;
		const { imageFile } = imageData;
		if(!imageFile){
			imageData = null;
		}

		const { type, id } = this.props.match.params;
		const { name, summary } = this.state;
		// upload image to claudinary
		// save the resulting url & display details to asset data
		this.props.saveDetails({
			id,
			type,
			name,
			summary,
			imageData
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
		// console.log(type);

		return (
			<div className="detail-container">
				<ContainerHeader headerText={`${operation} ${type}`} />
				<div className="container-body">
					<form onSubmit={this.handleSubmitForm}>
						<fieldset>
							<label htmlFor="name">
								<h3> {`Name for ${type}`} </h3>
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
									imageData={this.state.imageData}
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
	}).isRequired,

	history: shape({
		push: func.isRequired
	}).isRequired,

	assetData: shape({
		id: string.isRequired,
		name: string.isRequired,
		summary: string,
		imageData: shape({
			imageUrl: string.isRequired,
			imageDisplayData: shape({
				imageMoveX: number.isRequired,
				imageMoveY: number.isRequired,
				imageScaleX: number.isRequired,
				imageScaleY: number.isRequired,
				rotation: number.isRequired
			}).isRequired
		})
	}),

	saveDetails: func.isRequired
};

DetailContainer.defaultProps = {
	assetData: null,
}

function mapStateToProps({ assetsData: {data} }, props){
	const { operation, id } = props.match.params;
	// console.log(operation, type, id);

	let assetData;
	if(operation === "edit" && id && data[id]){
		const { name, imageData, summary } = data[id];
		assetData = {
			id,
			name,
			summary,
			imageData
		}
	}
	// console.log(assetData)

	return {
		// imageData,
		assetData
	};
}

export default connect( mapStateToProps, { saveDetails })(DetailContainer);
