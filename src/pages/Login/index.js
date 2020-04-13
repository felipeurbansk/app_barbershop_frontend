import React, {useState} from 'react';

import './style.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function hundleLogin(e) {
        e.preventDefault();

        console.log(e)
    }

    return (
        <div className="container-login">
            <div className="content">
                <div className="img-logo">
                    <h1>Logo</h1>
                </div>
                <div className="form">
                    <form onSubmit={hundleLogin}>
                        <input type="email" placeholder="E-mail"/>
                        <input type="password" placeholder="Senha"/>
                        
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}