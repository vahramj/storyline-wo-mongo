import React, { Component } from "react";
import { Link } from "react-router-dom";
import { string, shape, number, func } from "prop-types";
import { connect } from "react-redux";

import ContainerHeader from "../ContainerHeader";
import ImageSelector from "../ImageEditor/ImageSelector";
import DetailsFieldsPhase from "./DetailsFieldsPhase";
import DetailsFieldsCharacter from "./DetailsFieldsCharacter";
import DetailsFieldsScene from "./DetailsFieldsScene";

import { saveDetails } from "../../actions/actionCreators";

import "./styles/DetailsContainer.css";

const detailFieldsTypes = {
	phase: DetailsFieldsPhase,
	character: DetailsFieldsCharacter,
	scene: DetailsFieldsScene
};

const assetDataFields = {
	phase: ["name", "summary"],
	character: ["name", "gender", "age", "race", "description"],
	scene: ["scene", "int_ext", "location", "time", "summary"]
};

class DetailsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageData: null,
			handleSubmit(value) {
				// console.log("I am handleSubmit, hohoho");
				return value;
			},
			submitting: false,
			changed: false
		};

		const { assetData } = props;
		// console.log("assetData: ", assetData);
		if (assetData && assetData.imageData) {
			this.state.imageData = assetData.imageData;
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

	getReduxFormFunctions = ({ handleSubmit, reset, pristine }) => {
		// console.log(pristine);
		const changed = pristine ? this.state.changed : true;
		this.setState({ handleSubmit, reset, changed });
	};

	setImageData = newImageData => {
		const oldImageData = this.state.imageData || {};
		this.setState({ imageData: { ...oldImageData, ...newImageData }, changed: true });
	};

	handleSubmitForm = () => {
		// event.preventDefault();
		console.log("vahram, DetailsContainer form just got submitted, figure why. It shouldn't");
	};

	handleSaveDetails = formValues => {
		// event.preventDefault();
		console.log("saving details");
		// console.log("formValues: ", formValues);
		
		this.setState({submitting: true})

		const { imageData } = this.state;
		const { type, id } = this.props.match.params;

		const relevantFormValues = Object.assign({}, formValues);
		if(relevantFormValues.gender === "other"){
			relevantFormValues.gender = relevantFormValues.anotherGender;
		}
		delete relevantFormValues.anotherGender;

		// upload image to claudinary
		// save the resulting url & display details to asset data
		// console.log("formValues: ", formValues, "relevantFormValues: ", relevantFormValues);
		this.props.saveDetails({
			id,
			type,
			imageData,
			...relevantFormValues,
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

	handleResetDetails = () => {
		const { reset } = this.state;
		reset();

		const { assetData } = this.props;
		let newImageData = null;
		// console.log("assetData: ", assetData);
		if (assetData && assetData.imageData) {
			newImageData = assetData.imageData;
		}
		this.setState({ imageData: newImageData, changed: false });
	}

	getInitialValues() {
		const { type } = this.props.match.params;
		const { assetData } = this.props;
		const initialValues = {};


		if(assetData){
			assetDataFields[type].forEach(fieldName => {
				const fieldValue = assetData[fieldName];
				if(fieldValue){
					initialValues[fieldName] = fieldValue
				}
			});
		}

		if (type === "character") {
			if(!initialValues.gender){
				initialValues.gender = "male";
			}
			else if (initialValues.gender !== "male" && initialValues.gender !== "female") {
				initialValues.gender = "other";
				initialValues.anotherGender = assetData.gender;
			}				
		}
		else if (type === "scene") {
			if (!initialValues.int_ext) {
				initialValues.int_ext = "int";
			}
		}

		return initialValues;
	}

	render() {
		// console.log("rendering DetailsContainer")
		const { type, operation } = this.props.match.params;
		const { handleSubmit } = this.state;
		const initialValues = this.getInitialValues();

		const DetailFields = detailFieldsTypes[type];

		// console.log("initialValues: ", initialValues)

		return (
			<div className="main">
				<div className="detail-container">
					<ContainerHeader headerText={`${operation} ${type}`} />

					<div className="container-body">
						<form onSubmit={this.handleSubmitForm}>
							<DetailFields
								getReduxFormFunctions={this.getReduxFormFunctions}
								initialValues={initialValues}
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
									<input
										type="button"
										className="btn btn-primary"
										onClick={handleSubmit(this.handleSaveDetails)}
										value="save"
									/>

									<Link className="btn btn-danger" to="/">
										cancel
									</Link>

									<input
										type="button"
										className="btn"
										onClick={this.handleResetDetails}
										value="reset"
										disabled = {this.state.submitting || !this.state.changed}
									/>
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

	saveDetails: func.isRequired
};

DetailsContainer.defaultProps = {
	assetData: null
};

function mapStateToProps({ assetsData: { data } }, props) {
	const { operation, id } = props.match.params;

	let assetData;
	if (operation === "edit" && id && data[id]) {
		assetData = data[id];
	}

	return {
		assetData
	};
}

export default connect(mapStateToProps, { saveDetails })(DetailsContainer);
