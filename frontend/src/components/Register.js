import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from "./SignUpForm";
import auth from "../utils/Auth"

function Register({ handleRegister, onSuccess }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
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
        auth.register(formValue.email, formValue.password)
            .then(() => {
                setFormValue({ email: '', password: '' });
                onSuccess(true);
                handleRegister();
                navigate('/sign-in', { replace: true });
            }
            )
            .catch((err) => {
                onSuccess(false);
                handleRegister();
                console.log(err)
            })
    }

    return (
        <SignUpForm
            textHeader="Регистрация"
            textButton="Зарегистрироваться"
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formValue={formValue}
            redirect={true}
        />
    );
}

export default Register;