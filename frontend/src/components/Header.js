import logoMesto from '../images/logo.svg'
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from 'react';



function Header({ email, onSignOut, loggedIn }) {

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [burgerMenuUp, setBurgerMenuUp] = useState(false);

  useEffect(() => {
    function handleResize() {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (currentWidth < 620 && burgerMenu) {
      setBurgerMenuUp(true);
    } else {
      setBurgerMenuUp(false);
    }
  }, [currentWidth, burgerMenu]);

  function handleHeaderBurgerClick() {
    burgerMenu
      ? setBurgerMenu(false)
      : setBurgerMenu(true);
  }

  return (
    <>
      {loggedIn && burgerMenuUp &&
        <div className="header__container">
          <p className="header__email">{email}</p>
          <Link onClick={onSignOut}
            className="header__exit"
          >
            Выйти
          </Link>
        </div>
      }
      <header className="header">
        <img className="header__logo" src={logoMesto} alt="Лого" />
        <Routes>
          <Route
            path="sign-in"
            element={
              <Link
                to="/sign-up"
                className="header__link"
              >
                Регистрация
              </Link>
            }
          />
          <Route
            path="sign-up"
            element={
              <Link
                to="/sign-in"
                className="header__link"
              >
                Войти
              </Link>
            }
          />

          <Route
            path="/"
            element={
              <>
                {currentWidth > 620
                  ?
                  <div className="header__container">
                    <p className="header__email">{email}</p>
                    <Link onClick={onSignOut}
                      className="header__exit"
                    >
                      Выйти
                    </Link>
                  </div>
                  :
                  <button
                    className={`header__button ${burgerMenu && "header__button_close"}`}
                    type="button"
                    onClick={handleHeaderBurgerClick}
                  ></button>
                }
              </>
            }
          />
        </Routes>
      </header>
    </>
  );
}

export default Header