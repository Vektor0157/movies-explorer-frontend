import './FilterCheckbox.css';

function FilterCheckbox() {
	return (
		<section className='filterCheckbox'>
			<label className="filterCheckbox__label">
				<input type="checkbox" id="short-films" className="checkbox-input" />
			</label>
			<div className="filterCheckbox__circle">
				<div className="filterCheckbox__circle-container">
					<div className="filterCheckbox__circle_oval"></div>
				</div>
			</div>
			<h2 className='filterCheckbox__title'>Короткометражки</h2>
		</section>
	)
}

export default FilterCheckbox;