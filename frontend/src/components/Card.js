import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { useContext } from "react";

function Card({ card, onCardClick, onBinClick, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <div className="element">
      <button
        className={`element__bin ${isOwn ? `element__bin_visible` : ``}`}
        type="button"
        onClick={() => onBinClick(card)}
      ></button>
      <img onClick={() => onCardClick(card)} className="element__image" src={card.link} alt={card.name} />
      <div className="element__info">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__likes">
          <button className={`element__heart ${isLiked ? `element__heart_active` : ``}`} type="button" id="likebutton" onClick={() => onCardLike(card)}></button>
          <span className="element__like-count">{(card.likes || []).length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;