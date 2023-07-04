import React from "react"
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = React.useContext(CurrentUserContext); //11ПР Используйте контекст в Main

  return (
    <main className="content">

      <section className="profile">

        <div className="profile__user">

          <div className="profile__avatar-group" >
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" /> {/* //11ПР Используйте контекст в Main */}
            <button
              className="profile__avatar-edit"
              onClick={onEditAvatar} />
          </div>

          <div className="profile__intro">
            <h1 className="profile__title">{currentUser.name}</h1> {/* //11ПР Используйте контекст в Main */}
            <button
              className="profile__edit-button link-hover"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            />
            <p className="profile__subtitle">{currentUser.about}</p> {/* //11ПР Используйте контекст в Main */}
          </div>

        </div>

        <button
          className="profile__add-button link-hover"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        />

      </section>

      {/* Карточки */}
      <section className="elements">
        {cards.map((card, _id) => (
            <Card
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={card}
            />
          ))}
      </section>

    </main>
  )
}

export default Main;
