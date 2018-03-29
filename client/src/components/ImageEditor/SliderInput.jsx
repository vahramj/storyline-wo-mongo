import React from "react";
import { string, func, number } from "prop-types";

function SliderInput(props){
	const { min, max, changeHandler, value, step, label, name } = props;
	return(
		<div className="slider-input">
			<label htmlFor={`${name}`}>
				{`${label}`}
				<input
					type="range"
					onChange={changeHandler}
					value={value}
					step={`${step}`}
					min={`${min}`}
					max={`${max}`}
				/>
				<input
					type="number"
					id={`${name}`}
					onChange={changeHandler}
					value={value}
					step={`${step}`}
				/>
			</label>
		</div>
	);
}

SliderInput.propTypes = {
	min: string,
	max: string,
	changeHandler: func.isRequired,
	value: number.isRequired,
	step: string,
	label: string,
	name: string.isRequired
};

SliderInput.defaultProps = {
	min: "",
	max: "",
	step: "1",
	label: ""
}

export default SliderInput;