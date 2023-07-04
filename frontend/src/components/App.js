import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  React.useEffect(() => {
    api.getInitialCards()
      .then(cardData => {
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки. ЛАЙКИ ПОКА РАБОТАЮТ ТОЛЬКО ПОСЛЕ ОБНОВЛЕНИЯ СТРАНИЦЫ
    if (!isLiked) {
      api.putLike(card._id)
        .then((cardId) => {
          setCards((state) => state.map((c) => (c._id === card._id ? cardId : c)));
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    } else {
      api.removeLike(card._id)
        .then((cardId) => {
          setCards((state) => state.map((c) => (c._id === card._id ? cardId : c)));
        })
        .catch((err) => {
          console.log(`${err}`);
      });
    }
  }

 //удаление карточки
 function handleCardDelete(card) {
  api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  //изменение данных о пользователе
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  //смена аватара
  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
  }

  //Закрытие по Esc
  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />
        <Footer />
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name="deletecard" title="Вы уверены?" buttonTitle="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
