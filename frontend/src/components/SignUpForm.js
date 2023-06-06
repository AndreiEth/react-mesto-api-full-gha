import { Link, redirect } from "react-router-dom";

function SignUpForm({
    textHeader,
    textButton,
    handleSubmit,
    handleChange,
    formValue,
    redirect = false
}) {
    return (
        <div className="signup-form">
            <div className="signup-form__header">
                <h1 className="signup-form__header_text">
                    {textHeader}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="signup-form__form" method="post">

                <div>
                    <div className="signup-form__input">
                        <input
                            required
                            className="signup-form__input_text"
                            id="email"
                            name="email"
                            type="email"
                            value={formValue.email || ""}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </div>
                    <div className="signup-form__input">
                        <input
                            required
                            className="signup-form__input_text"
                            id="password"
                            name="password"
                            type="password"
                            value={formValue.password || ""}
                            onChange={handleChange}
                            placeholder="Пароль"
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="signup-form__submit">
                        {textButton}
                    </button>

                    <div className="signup-form__redirect">
                        {redirect &&
                            <p className="signup-form__redirect_text">
                                Уже зарегистрированы?
                                <Link to="/sign-in" className="signup-form__redirect_link">
                                    Войти
                                </Link>
                            </p>
                        }
                    </div>
                </div>
            </form>
        </div >
    )
}

export default SignUpForm;