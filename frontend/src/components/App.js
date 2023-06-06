import '../index.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import BinPopup from './BinPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBinPopupOpen, setIsBinPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [removeCard, setRemoveCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const navigate = useNavigate();

  // delete card 
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setRemoveCard(card);
        setCards((newArray) => newArray.filter((item) => card._id !== item._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }


  // add & delete like on card
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.dislike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    } else {
      api.like(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    }
  }

  // profile popup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api.setMe(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  // new card popup
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  // avatar profile
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsBinPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleBinPopupClick(card) {
    setIsBinPopupOpen(true);
    setRemoveCard(card);
  }

  function handleRegister() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function onSuccess(isSuccess) {
    setIsSuccessful(isSuccess);
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch(err => console.log(err))
    }
  }, [navigate]);


  useEffect(() => {
    if (loggedIn) {
      api.getMe()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn]);

  function handleSingOut() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSingOut}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route exact path="/" element={
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onBinClick={handleBinPopupClick}
              cards={cards}
              onCardLike={handleCardLike}
            />}
          />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} onSuccess={onSuccess} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        </Routes>

        {loggedIn &&
          <Footer />
        }
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />

        <BinPopup
          isOpen={isBinPopupOpen}
          onClose={closeAllPopups}
          onRemoveCard={handleCardDelete}
          card={removeCard}
        />

        <ImagePopup
          isOpen={selectedCard}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
