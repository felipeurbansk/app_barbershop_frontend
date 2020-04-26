import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';


import BaseStruct from '../../../components/BaseStruct';

import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

import api from '../../../services/api';

import {formatDateApi} from '../../../utils/utils';

export default function EmployeeRegister() {

    const [d_nasc, setDNasc] = useState(new Date());
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [phone, setPhone] = useState('');
    const [is_active, setIsActive] = useState(1);

    const company_id = localStorage.getItem('user_company_id');

    const history = useHistory();

    async function register_employee( e ) {

        e.preventDefault();

        const data = { name, email, password, password_confirm, d_nasc: formatDateApi(d_nasc), phone, is_active }

        await api.post('employee', data, {
            headers: {
                company_id: company_id
            }
        }).then( success => {

            if ( success.data.error ) {
                
                Swal.fire(
                    success.data.error.title,
                    success.data.error.details,
                    'error'
                )

            } else {
                Swal.fire(
                    success.data.title,
                    success.data.details,
                    'success'
                ).then( () => {
                    history.push('/funcionarios');
                })
            }

        }).catch( err => {
            if ( err.response.data.error ) {
                Swal.fire(
                    err.response.data.error,
                    err.response.data.message,
                    'error'
                )
            }
        })

    }

    return (
        <BaseStruct>
            <div className="content-form register-employee">
                <section className="text-title">
                    Registrar novo funcionario
                </section>
                <div className="form-register">
                    <Form onSubmit={register_employee}>
                        <Row>
                            <Col>
                                <Form.Label>Nome completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    onChange={ name => setName(name.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    onChange={ email => setEmail(email.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    onChange={ password => setPassword(password.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Repita a senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    onChange={ password_confirm => setPasswordConfirm(password_confirm.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={ phone => setPhone(phone.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Data de nacimento</Form.Label>
                                <DatePicker
                                    required
                                    dateFormat="dd/MM/yyyy"
                                    selected={d_nasc}
                                    onChange={ d_nasc => setDNasc(d_nasc) }
                                    className="datepicker"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="input-is-active">
                                <Form.Label>Funcionario ativo?</Form.Label>
                                <div className="options">
                                    <Form.Check
                                        inline
                                        checked
                                        onChange={ is_active => {
                                            setIsActive(1)
                                        } }
                                        type="radio"
                                        name="is_active"
                                        value="1"
                                        label="Ativo"
                                    />
                                    <Form.Check
                                        inline
                                        onChange={ is_active => { 
                                            setIsActive(0)
                                        } }
                                        type="radio"
                                        name="is_active"
                                        value="0"
                                        label="Desativado"
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button 
                                    type="submit"
                                    variant="success"
                                >Cadastrar</Button>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        </BaseStruct>
    );
}