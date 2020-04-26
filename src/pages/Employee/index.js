import React, { useEffect, useState } from 'react'

import { Table, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {} from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import BaseStruct from '../../components/BaseStruct';

export default function Dashboard() {

    const [employees, setEmployees] = useState([]);

    useEffect( () => {

        const company_id = localStorage.getItem('user_company_id');

        api.get('company/employees',{

            headers: {
                company_id: company_id
            }

        }).then( response => {

            setEmployees( response.data.employees );

        }).catch( err => {
            console.log(err)
        });

    }, []);
    
    return (
        <BaseStruct>
            <div className="content-employee">
                <div className="employee-body">
                    <div className="menu-top">
                        <Link 
                            className="button menu-top-button"
                            to="/funcionarios/register">
                                Novo Funcionario
                        </Link>
                    </div>
                    <Table responsive striped hover className="table table-employees">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            { employees.map( employee => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td className="actions">
                                        <Dropdown>
                                            <Dropdown.Toggle className="mt-0 button-default" id="dropdown-basic">
                                                Ações
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Perfil</Dropdown.Item>
                                                <Dropdown.Item href="#">Desativar</Dropdown.Item>
                                                <Dropdown.Item href="#">Excluir</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </BaseStruct>
    );
}