import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup( {onUpdateUser, isOpen, onClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      nameUser: name,
      jobUser: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm isOpen={isOpen} name="user" title="Редактировать профиль" buttonTitle="Сохранить" onClose={onClose} onSubmit={handleSubmit} >
        <label className="field">
            <input
              id="name-input"
              className="popup__input"
              name="nameUser"
              type="text"
              value={name || ''}
              placeholder="Укажите ваше имя"
              required=""
              minLength={2}
              maxLength={40}
              onChange={handleChangeName}
            />
            <span className="popup__input-error name-input-error" />
        </label>

        <label className="field">
            <input
              id="job-input"
              className="popup__input"
              name="jobUser"
              type="text"
              value={description || ''}
              placeholder="Укажите вашу профессию"
              required=""
              minLength={2}
              maxLength={200}
              onChange={handleChangeDescription}
            />
            <span className="popup__input-error job-input-error" />
        </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
