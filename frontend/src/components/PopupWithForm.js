function PopupWithForm({ name, isOpen, title, onClose, saveText, children, onSubmit }) {
  return (
    <div className={` popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose}
          className="popup__close-button"
          type="button">
        </button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" action="#" name={name} id={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">{saveText}</button>
          <div className="popup__submit-error"></div>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm 