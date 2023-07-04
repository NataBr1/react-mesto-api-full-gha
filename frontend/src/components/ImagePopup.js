import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup view ${props.card ? `popup_opened`: ""}`}>
        <div className="view__wrapper">
          <img className="view__photo" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} />
          <h2 className="view__caption">{props.card ? props.card.name : ""}</h2>
          <button
            className="popup__closed link-hover"
            type="button"
            aria-label="Закрыть"
            onClick={props.onClose}
          />
        </div>
      </div>
  )
}

export default ImagePopup;
