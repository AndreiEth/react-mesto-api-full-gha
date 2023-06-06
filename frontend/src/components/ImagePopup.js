function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={` popup ${isOpen ? 'popup_opened' : ''}`} id="imagepopup">
      <div className="popup__image-container">
        <button onClick={onClose} className="popup__close-button" type="button" id="closeimagebutton"></button>
        <img className="popup__image-zoom"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="popup__image-name">{card ? card.name : ""}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;