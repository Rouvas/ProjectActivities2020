import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {API_AUTH} from "../../api/v1";
import {useHistory} from 'react-router-dom';

export const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const sendDataHandler = async () => {
        try {
            const response = await axios.post(`${API_AUTH}/login`, {
                email, password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userName', response.data.name + ' ' + response.data.surname);
            localStorage.setItem('userEmail', response.data.email);

            history.push('/home')
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={'SignIn'}>
            <div className="header-content">
                <h1>Логин</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet eaque illo ipsa itaque, iure natus neque obcaecati officia placeat provident similique voluptatem. Aliquam dicta error pariatur quae quasi?</p>
            </div>

            <div className="SignIn__container">

                <Container>
                    <Row>
                        <Col xl={6}>
                            <div className="formInput">
                                <p>Логин</p>
                                <input type="email" onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </Col>
                        <Col xl={6}>
                            <div className="formInput">
                                <p>Пароль</p>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <button onClick={sendDataHandler}>Войти</button>
            </div>
        </div>
    )
};