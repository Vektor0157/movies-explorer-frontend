import './FilterCheckbox.css';

const FilterCheckbox = ({ label, handleCheckbox, isShort }) => {
	return (
		<div className="filter-checkbox__btn-container link">
			<input type="checkbox" id="checkbox-button" className="filter-checkbox__btn" checked={isShort} onChange={handleCheckbox}/>
			<label htmlFor="checkbox-button" className="filter-checkbox__text">
				{label}
			</label>
		</div>
	);
};

export default FilterCheckbox;