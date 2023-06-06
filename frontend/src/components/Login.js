import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from "./SignUpForm";
import auth from "../utils/Auth"

function Login({ handleLogin }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        };
        auth.authorize(formValue.email, formValue.password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setFormValue({ email: '', password: '' });
                    handleLogin();
                    navigate('/', { replace: true });
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <SignUpForm
          textHeader="Вход"
          textButton="Войти"
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formValue={formValue}
          redirect={false}
        />
      );
}

export default Login;

