import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [saveText, setSaveText] = useState("Создать");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSaveText("Сохранение...");
        onSubmit({
            name: name,
            link: link,
        })
    }

    useEffect(() => {
        if (isOpen) {
            setName("");
            setLink("");
            setSaveText("Создать");
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name='add-popup'
            isOpen={isOpen}
            title='Новое место'
            onClose={onClose}
            saveText={saveText}
            onSubmit={handleSubmit}
        >
            <input
                required
                minLength="2"
                maxLength="30"
                className="popup__popup-form popup__popup-form_text_place"
                id="form-place"
                name="name"
                type="text"
                placeholder="Название"
                value={name}
                onChange={handleNameChange}
            />
            <span className="popup__error" id="form-place-error"></span>
            <input
                required
                className="popup__popup-form popup__popup-form_text_image"
                id="form-image"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                value={link}
                onChange={handleLinkChange}
            />
            <span className="popup__error" id="form-image-error"></span>

        </PopupWithForm>
    )
}

export default AddPlacePopup;