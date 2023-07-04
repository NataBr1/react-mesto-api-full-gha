import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleAddNameCard(e) {
    setName(e.target.value);
  }

  function handleAddLinkCard(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} name="place" title="Новое место" buttonTitle="Сохранить" onClose={onClose} onAddPlace={onAddPlace} onSubmit={handleSubmit} >
        <label className="field">
            <input
              id="place-input"
              className="popup__input"
              name="name"
              type="text"
              placeholder="Название"
              required=""
              minLength={2}
              maxLength={30}
              value={name}
              onChange={handleAddNameCard}
            />
            <span className="popup__input-error place-input-error" />
        </label>

        <label className="field">
            <input
              id="link-input"
              className="popup__input"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required=""
              value={link}
              onChange={handleAddLinkCard}
            />
            <span className="popup__input-error link-input-error" />
        </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup ;
