import "./Popup.css"
import OK from "../../images/Ok.svg"
import FAIL from "../../images/Fail.svg"

function Popup({isSuccess, onClose, isOpen}){
	const title = isSuccess ? "Данные обновлены!" : "Что-то пошло не так! Попробуйте еще раз.";
	return(
		<div className={isOpen ? "popup popup_opened" : "popup"}>
			<div className="popup__overlay" onMouseDown={onClose}></div>
			<div className="popup__container" onMouseDown={onClose}>
				<div className="popup__form">
					<button className="popup__close-btn link" type="button" onClick={onClose}/>
					{isSuccess ? (
						<>
							<img src={OK} alt="Успех" className="popup__image" />
							<h2 className="popup__title">{title}</h2>
						</>
					) : (
						<>
							<img src={FAIL} alt="Ошибка" className="popup__image" />
							<h2 className="popup__title">{title}</h2>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
export default Popup