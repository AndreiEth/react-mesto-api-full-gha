import React from "react";
import successIcon from "../images/Success-icon.svg";
import failIcon from "../images/Fail-icon.svg";

function InfoTooltip({ isOpen, onClose, isSuccessful }) {

    const title = isSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
    const iconAlarm = isSuccessful ? successIcon : failIcon;
    const iconAlt = isSuccessful ? "Регистрация прошла успешно." : "Регистрация не была выполнена.";
    
    return (
        <section className={`popup  ${isOpen ? 'popup_opened' : ''}`} >
            <div className='popup__container' >
                {iconAlarm &&
                    <div className={`popup__tooltip_image`}> 
                   <img
                               src={`${iconAlarm}`}
                               alt={`${iconAlt}`}
                               />
                    </div>
                }
                <button onClick={onClose}
                    className="popup__close-button"
                    type="button"></button>
                <h2 className="popup__tooltip_title">{title}</h2>
            </div>
        </section>
    );
};

export default InfoTooltip;
    // return (
    //     <div
    //         className={`popup ${isOpen ? "popup_opened" : ""}`}
    //     >
    //         <div className="popup__content">
    //             {isSuccessful
    //                 ? (
    //                     <>
    //                         <img
    //                             src={`${successIcon}`}
    //                             alt="Регистрация прошла успешно."
    //                             className="popup__tooltip_image"
    //                         />
    //                         <p className="popup__tooltip_text">
    //                             Вы успешно зарегистрировались!
    //                         </p>
    //                     </>
    //                 )
    //                 : (
    //                     <>
    //                         <img
    //                             src={`${failIcon}`}
    //                             alt="Регистрация не была выполнена."
    //                             className="popup__tooltip_image"
    //                         />
    //                         <p className="popup__tooltip_text">
    //                             Что-то пошло не так. Попробуйте ещё раз!
    //                         </p>
    //                     </>
    //                 )}

  
    //         </div>
    //     </div>
    // );
