import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox({ onChange, checked }) {
	return (
		<div className='checkbox'>
			<label className='checkbox__label'>
				<input className='checkbox__input' id="checkbox" type="checkbox" checked={checked} onChange={onChange}/>
				<div className="checkbox__checkmark"></div>
				<div className="checkbox__body">Короткометражки</div>
			</label>
		</div>
	);
};
export default FilterCheckbox;