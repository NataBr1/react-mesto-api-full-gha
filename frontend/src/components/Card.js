import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext); //Подписываемся на контекст
  const isOwn = props.card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = props.card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  ); // Создаём переменную, которую после зададим в `className` для кнопки лайка

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element" >
      <img className="element__photo link-hover" src={props.link} alt={props.name} onClick={handleClick} />
     {isOwn && <button type="button" className="element__delete" onClick={handleDeleteClick} />}
      <div className="element__group">
        <h2 className="element__title">{props.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="element__like-number">{props.likes}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
