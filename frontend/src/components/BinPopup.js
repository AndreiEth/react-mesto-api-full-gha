import PopupWithForm from './PopupWithForm';

function BinPopup({ isOpen, onClose, onRemoveCard, card}) {

    function handleSubmit(e) {
        e.preventDefault();
        onRemoveCard(card);
      }

    return(
        <PopupWithForm
          name='bin-popup'
          isOpen={isOpen}
          title='Вы уверены?'
          onClose={onClose}
          saveText='Да'
          onSubmit={handleSubmit}
        />

    )
}

export default BinPopup;