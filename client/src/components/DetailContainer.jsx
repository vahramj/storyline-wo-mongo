import React, { Component } from "react";
import { Link } from "react-router-dom";
import { string, shape } from "prop-types";
import Dropzone from "react-dropzone";
import sha1 from "sha1";
import superagent from 'superagent';

import "./styles/DetailContainer.css";

class DetailContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			summary: "",
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

	uploadFile = (files) => {
		console.log(files)

		const image = files[0];

		const cloudName = "cldimgs";
		const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
		
		const timestamp = Date.now()/1000;
		const uploadPreset = "affevzry";
		const secret = "1IA49RibTzlQ-NmpNFt9i7LYVz0";

		const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}${secret}`;
		const signature = sha1(paramsStr);
		console.log("paramsStr: ", paramsStr);
		console.log("signature: ", signature);
		
		const params = {
			timestamp,
			signature,
			"api_key": "295886862954169",
			"upload_preset": uploadPreset,
		};

		const uploadRequest = superagent.post(url);
		uploadRequest.attach("file", image);

		Object.keys(params).forEach(key=>{
			uploadRequest.field(key, params[key])
		});

		uploadRequest.end((err, resp) => {
			if(err){
				alert("err: ", err);
				return;
			}
			
			const uploaded = resp.body;
			console.log("upload complete: ", JSON.stringify(uploaded));
			
			// const images = Object.assign([], this.state.images);
			// images.push(uploaded);
			// this.setState({images});
		});
	};

	handleNameChange = event => {
		this.setState({
			name: event.target.value
		})
	};

	handleSummaryChange = event => {
		this.setState({
			summary: event.target.value
		})
	};

	render() {
		const { type, operation } = this.props.match.params;
		// console.log(this.props);

		return (
			<div className="detail-container">
				<header>
					<div className="h2Wrapper">
						<h2>{`${operation} ${type}`.toUpperCase()}</h2>
					</div>
				</header>
				<div className="container-body">
					<form onSubmit={this.onSubmit} >
						<fieldset>
							<label htmlFor="name">
								<p> Name for phase </p>
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
								<p>Summary</p>
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
							<Dropzone className="dropzone" onDrop={this.uploadFile}>
								<div>
									<p>click me</p>
									<p>or</p> 
									<p>drop an image onto me</p>
								</div>
							</Dropzone>
							{/*
							<label htmlFor="file">
								<p>Select image</p>
								<input
									type="file"
									id="imageFile"
									name="imageFile"
									ref = {inputElem => {
										this.fileInputElem = inputElem
									}}
									onChange = {this.onImageChange}
								/>
							</label>
							*/}

							{/*
							<label htmlFor="image-url">
								<fieldset>
									<p>
										<input type="radio" name="imageInput" />
										<span>Image url</span>
									</p>
									<input type="text" id="image-url" size="60" name="imageUrl" />
								</fieldset>
							</label>
							*/}
						</fieldset>

						<fieldset>
							<div className="btns">
								<button className="btn btn-primary">add</button>
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
