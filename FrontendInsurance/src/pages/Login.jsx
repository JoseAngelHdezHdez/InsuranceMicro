import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { login } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const {name, value} = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("loginForm =>", loginForm);
        // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
        const data = await login(loginForm.email, loginForm.password);

        if(!data){
            alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            return;
        }

        navigate('/insurance');
        window.location.reload();
        setLoginForm({
            email: '',
            password: ''
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Form
                style={{
                    width: '35%',
                    border: 'none',
                    borderRadius: '1rem',
                    padding: '2rem',
                    margin: '2rem',
                    boxShadow: '0 0 0.5rem #0000000a, 0 0.125rem 1.125rem #0000001a',
                }}
                onSubmit={(e) => handleSubmit(e)}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={handleChange}
                        name='email'
                        value={loginForm?.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder='Ingrese su contraseña'
                            onChange={handleChange}
                            value={loginForm?.password}
                            maxLength={20}
                            minLength={8}
                        />
                        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                            {showPassword ? <img src={EyeSlash} alt='eyeSlash'/> : <img src={Eye} alt='eye'/>}
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Button type='submit' variant="outline-primary" >
                    Iniciar sesión
                </Button>
            </Form>
        </div>
    )
}

export default Login
