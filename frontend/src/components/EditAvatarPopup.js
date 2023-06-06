import { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();
    const [saveText, setSaveText] = useState("Сохранить");

    function handleSubmit(e) {
        e.preventDefault();
        setSaveText("Сохранение...");
        onUpdateAvatar(avatarRef.current.value);

    }
    useEffect(() => {
        avatarRef.current.value = '';
        setSaveText("Сохранить");
      }, [isOpen]);

    return (
        <PopupWithForm
            name='avatar-popup'
            isOpen={isOpen}
            title='Обновить аватар'
            onClose={onClose}
            saveText={saveText}
            onSubmit={handleSubmit}
        >
            <input
                required
                className="popup__popup-form popup__popup-form_text_image"
                id="form-avatar"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
            />
            <span className="popup__error" id="form-avatar-error"></span>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;