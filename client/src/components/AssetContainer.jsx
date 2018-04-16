import React from "react";
import { string, func } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AssetCollection from "./AssetCollection";
import ContainerHeader from "./ContainerHeader";

import { setSearchTerm } from "../actions/actionCreators";

import "./styles/AssetContainer.css";

const AssetContainer = props => {
	const { searchTerm, type } = props;
	function handleSearchTermChange(event) {
		props.setSearchTerm(event.target.value, type);
	}
	function resetSetSearchTerm() {
		props.setSearchTerm("", type);
	}
	const hidden = searchTerm.length === 0 ? "hidden" : "";
	return (
		<div className="asset-container">

			<ContainerHeader headerText={`${type}s`}>				
				<Link to={`/add/${type}`}>
					<div className="small-plus-icon">&#43;</div>
				</Link>
			</ContainerHeader>

			<section className="container-body">
				<div className="search-bg-fader">
					<input
						type="text"
						placeholder="search"
						onChange={handleSearchTermChange}
						value={searchTerm}
					/>
					<span
						className={`cancel-icon ${hidden}`}
						role="none"
						onClick={resetSetSearchTerm}
					>
						&#x2297;
					</span>
				</div>
				<AssetCollection type={type} searchTerm={searchTerm} />
			</section>
		</div>
	);
};

AssetContainer.propTypes = {
	type: string.isRequired,
	searchTerm: string,
	setSearchTerm: func.isRequired
};
AssetContainer.defaultProps = {
	searchTerm: ""
};

// function mapDispatchToProps(dispatch, { type }){
// 	return {
// 		handleSearchTermChange(event){
// 			dispatch(setSearchTerm(event.target.value, type))
// 		}
// 	};
// }
function mapStateToProps({ searchTerms }, { type }) {
	const searchTerm = searchTerms[type];
	return { searchTerm };
}
export default connect(mapStateToProps, { setSearchTerm })(AssetContainer);
