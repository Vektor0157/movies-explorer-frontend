import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
	return (
		<div className='searchForm'>
			<div className='searchForm__content'>
				<form>
					<input type="text" className="searchForm__input" placeholder="Фильм" />
					<button className="searchForm__button">Поиск</button>
				</form>
			</div>
			<FilterCheckbox />
			<div className='searchForm__separator'></div>
		</div>
	)
}

export default SearchForm;