import React from "react";
import { string, func, number, bool } from "prop-types";

function SliderInput(props){
	
	const { min, max, changeHandler, value, step, label, name, disabled } = props;

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
					disabled={disabled}
				/>
				<input
					type="number"
					id={`${name}`}
					onChange={changeHandler}
					value={value}
					step={`${step}`}
					disabled={disabled}
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
	name: string.isRequired,
	disabled: bool
};

SliderInput.defaultProps = {
	min: "",
	max: "",
	step: "1",
	label: "",
	disabled: false
}

export default SliderInput;