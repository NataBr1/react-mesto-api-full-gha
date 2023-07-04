import React from "react";

function PopupWithForm({isOpen, onClose, name, title, buttonTitle, children, onSubmit}) {

  return (
    <div className={`popup popup_${name} ${isOpen ? `popup_opened`: ""}`} >
      <div className="popup__container">
        <form
          className={`popup__form popup__form_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button" type="submit" aria-label="Сохранить">
            {buttonTitle}
          </button>
        </form>
        <button
          className="popup__closed link-hover"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
