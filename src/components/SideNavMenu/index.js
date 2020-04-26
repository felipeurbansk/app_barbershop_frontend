import React, { useState, useEffect }  from 'react'
import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';
import {FiBarChart2, FiUsers} from 'react-icons/fi';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './style.css';
import UserImage from '../../assets/image/user_profile.png';

export default function SideNavMenu() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    useEffect( () => {
        getUserInfo();

    });

    function getUserInfo() {

        setName(localStorage.getItem('user_name'));
        setEmail(localStorage.getItem('user_email'));

    }

    return (
        <Router>
            <Route render={({ location }) => (
                <React.Fragment>
                    <SideNav
                        onSelect={(selected) => {
                            const to = '/' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}
                        className="sidebar-nav"
                    >
                        <Toggle />
                        <Nav defaultSelected="dashboard">
                            <NavItem eventKey="info-user" navitemClassName="user-info" disabled>
                                <NavIcon>
                                    <img src={UserImage} className="user-image" alt="Imagem do usuário logado."/>
                                </NavIcon>
                                <NavText className="nav-text-user">
                                    <div className="label-user-name">
                                        <span className="user-field user-name">{name}</span>
                                    </div>
                                    <div className="label-user-email">
                                        <span className="user-field user-email">{
                                            ( email.length > 20 ? email.substr(0, 20) + '...' : email )
                                        }</span>
                                    </div>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="dashboard" className="nav-item">
                                <NavIcon>
                                    <FiBarChart2 size="20px"/>
                                </NavIcon>
                                <NavText>
                                    Dashboard
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="funcionarios">
                                <NavIcon>
                                    <FiUsers size="20px"/>
                                </NavIcon>
                                <NavText>
                                    Funcionario
                                </NavText>
                            </NavItem>
                        </Nav>
                    </SideNav>

                </React.Fragment>
            )}
            />
        </Router>
    );
}