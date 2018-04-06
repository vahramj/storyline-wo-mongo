import React, { Component } from "react";
import { Link } from "react-router-dom";
import { string, shape, number, func } from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";

import ContainerHeader from "./ContainerHeader";
import DetailField from "./DetailField";
import ImageSelector from "./ImageEditor/ImageSelector";

// import uploadImage from "../utils/uploadImage";
import { saveDetails } from "../actions/actionCreators";

import "./styles/DetailsContainer.css";

class DetailsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// name: "",
			summary: "",
			imageData: null
		};

		const { assetData } = props;
		if (assetData) {
			// this.state.name = assetData.name;
			this.state.summary = assetData.summary;
			if (assetData.imageData) {
				this.state.imageData = assetData.imageData;
			}
		}
	}

	componentDidMount() {
		const { operation, type } = this.props.match.params;
		const { assetData } = this.props;
		// vahram, optimize this to use location === "edit" rather than operation
		if (operation === "edit" && !assetData) {
			this.props.history.push(`/add/${type}`);
		}
	}

	// ██╗   ██╗████████╗██╗██╗     ███████╗
	// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
	// ██║   ██║   ██║   ██║██║     ███████╗
	// ██║   ██║   ██║   ██║██║     ╚════██║
	// ╚██████╔╝   ██║   ██║███████╗███████║
	//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

	setImageData = newImageData => {
		const oldImageData = this.state.imageData || {};
		this.setState({ imageData: { ...oldImageData, ...newImageData } });
	};

	// ███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗  ██╗██████╗ ██╗     ███████╗
	// ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║  ██║██╔══██╗██║     ██╔════╝
	// █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ███████║██║  ██║██║     ███████╗
	// ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██╔══██║██║  ██║██║     ╚════██║
	// ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ██║  ██║██████╔╝███████╗███████║
	// ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝

	handleSubmitForm = event => {
		event.preventDefault();
		console.log("vahram, DetailsContainer form just got submitted, figure why. It shouldn't");
	};

	handleSummaryChange = event => {
		this.setState({
			summary: event.target.value
		});
	};

	handleSaveDetails = formValues => {
		// event.preventDefault();
		console.log("saving details");

		const { imageData } = this.state;
		// const { imageFile } = imageData;
		// if(!imageFile){
		// 	imageData = null;
		// }

		const { type, id } = this.props.match.params;
		// const { summary } = this.state;
		const { name, summary } = formValues;
		// upload image to claudinary
		// save the resulting url & display details to asset data
		this.props.saveDetails({
			id,
			type,
			name,
			summary,
			imageData
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
		const { handleSubmit } = this.props;

		return (
			<div className="main">
				<div className="detail-container">
					<ContainerHeader headerText={`${operation} ${type}`} />
					<div className="container-body">
						<form onSubmit={handleSubmit(this.handleSubmitForm)}>
							<Field
								headerText={`Name for ${type}`}
								name="name"
								id="name"
								component={DetailField}
								type="text"
							/>

							<Field
								headerText="Summary"
								name="summary"
								id="summary"
								cols="60"
								rows="10"
								component={DetailField}
								type="textarea"
							/>

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
									<button
										className="btn btn-primary"
										onClick={handleSubmit(this.handleSaveDetails)}
									>
										save
									</button>
									<Link className="btn btn-danger" to="/">
										cancel
									</Link>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

DetailsContainer.propTypes = {
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

	saveDetails: func.isRequired,

	handleSubmit: func.isRequired
};

DetailsContainer.defaultProps = {
	assetData: null
};

function mapStateToProps({ assetsData: { data } }, props) {
	const { operation, id } = props.match.params;
	// console.log(operation, type, id);

	let assetData;
	if (operation === "edit" && id && data[id]) {
		const { name, imageData, summary } = data[id];
		assetData = {
			id,
			name,
			summary,
			imageData
		};
	}
	console.log(assetData);

	return {
		// imageData,
		assetData,
		initialValues: assetData
	};
}

function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = "Please provide name for the asset";
	}
	return errors;
}

const reduxFormOptions = {
	validate,
	form: "assetDetailsForm"
};

const decorator = _.flowRight([
	connect(mapStateToProps, { saveDetails }),
	reduxForm(reduxFormOptions)
]);

export default decorator(DetailsContainer);
