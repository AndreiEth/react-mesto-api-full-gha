import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from "../context/CurrentUserContext.js";


function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onBinClick,
  cards,
  onCardLike
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
          <button type="button" onClick={onEditAvatar} className="profile__avatar-edit-button"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <p className="profile__user-about">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">

        {cards.map((card) => (
          <Card key={card._id}
            card={card}
            onCardClick={onCardClick}
            onBinClick={onBinClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  )
}

export default Main