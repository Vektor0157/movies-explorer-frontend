import './FilterCheckbox.css';

const FilterCheckbox = ({ label, handleCheckbox, isShort }) => {
	return (
		<div className="search__checkbox-btn-container link">
			<input type="checkbox" id="checkbox-button" className="search__checkbox-btn" checked={isShort} onChange={handleCheckbox}/>
			<label htmlFor="checkbox-button" className="search__text">
				{label}
			</label>
		</div>
	);
};

export default FilterCheckbox;