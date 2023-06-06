import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [saveText, setSaveText] = useState("Сохранить");
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(evt) {
        evt.preventDefault();
        setSaveText("Сохранение...");
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setSaveText("Сохранить");
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name='edit-popup'
            isOpen={isOpen}
            title='Редактировать профиль'
            onClose={onClose}
            saveText={saveText}
            onSubmit={handleSubmit}
        >
            <input
                required
                minLength="2"
                maxLength="40"
                className="popup__popup-form popup__popup-form_text_name"
                id="form-name"
                name="name"
                type="text"
                placeholder="Имя"
                value={name || ""}
                onChange={handleNameChange}
            />
            <span className="popup__error" id="form-name-error"></span>
            <input
                required
                minLength="2"
                maxLength="200"
                className="popup__popup-form popup__popup-form_text_job"
                id="form-job"
                name="about"
                type="text"
                placeholder="О себе"
                value={description || ""}
                onChange={handleDescriptionChange}
            />
            <span className="popup__error" id="form-job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup