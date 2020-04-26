import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Notifications, {notify} from 'react-notify-toast';

import api from '../../services/api';

import './style.css'

const Swal = require('sweetalert2');

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    async function hundleLogin(e) {
        e.preventDefault();

        const login = await api.post('/login', {
            email,
            password
        }).then(success => {
            
            const { id, name, email, company_id } = success.data.user;

            if ( id ) localStorage.setItem('user_id', id);
            if ( name ) localStorage.setItem('user_name', name);
            if ( email ) localStorage.setItem('user_email', email);
            if ( company_id ) localStorage.setItem('user_company_id', company_id);
            
            if ( success.data.token ) {

                notify.show(
                    'Você está logado!',
                    'success'
                );

                localStorage.setItem('user_token', success.data.token);
                history.push("/dashboard");
            }

        }).catch(err => {
            Swal.fire({
                title:"Erro",
                text: err.response.data.error
            })
        });

        console.log(login)
    }

    return (
        <div className="container-login">
            <Notifications />
            <div className="content">
                <div className="img-logo">
                    <h1>Logo</h1>
                </div>
                <div className="form">
                    <form onSubmit={hundleLogin}>
                        <input 
                        type="email"
                        onChange={ e=> { setEmail(e.target.value) } }
                        placeholder="E-mail"/>
                        <input 
                            type="password"
                            onChange={ e => { setPassword(e.target.value) } }
                            placeholder="Senha"/>
                        
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}