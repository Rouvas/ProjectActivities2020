import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {API_AUTH} from "../../api/v1";
import {useHistory} from 'react-router-dom';

export const SignUp = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    const history = useHistory();

    const sendDataHandler = async () => {
      try {
          await axios.post(`${API_AUTH}/register`, {
              name, surname, email, login, password, repeat
          });

          history.push('/login')
      } catch (e) {
          console.log(e)
      }
    };

    return (
      <div className={'SignUp'}>
          <div className="header-content">
              <h1>Регистрация</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet eaque illo ipsa itaque, iure natus neque obcaecati officia placeat provident similique voluptatem. Aliquam dicta error pariatur quae quasi?</p>
          </div>

          <div className="SignUp__container">

              <Container>
                  <Row>
                      <Col xl={6}>
                          <div className="formInput">
                              <p>Имя</p>
                              <input type="text" onChange={e => setName(e.target.value)}/>
                          </div>
                      </Col>
                      <Col xl={6}>
                          <div className="formInput">
                              <p>Фамилия</p>
                              <input type="text" onChange={e => setSurname(e.target.value)}/>
                          </div>
                      </Col>
                  </Row>

                  <Row>
                      <Col xl={6}>
                          <div className="formInput">
                              <p>Email</p>
                              <input type="email" onChange={e => setEmail(e.target.value)}/>
                          </div>
                      </Col>
                      <Col xl={6}>
                          <div className="formInput">
                              <p>Логин</p>
                              <input type="text" onChange={e => setLogin(e.target.value)}/>
                          </div>
                      </Col>
                  </Row>

                  <Row>
                      <Col xl={6}>
                          <div className="formInput">
                              <p>Пароль</p>
                              <input type="password" onChange={e => setPassword(e.target.value)}/>
                          </div>
                      </Col>
                      <Col xl={6}>
                          <div className="formInput">
                              <p>Повторить пароль</p>
                              <input type="password" onChange={e => setRepeat(e.target.value)}/>
                          </div>
                      </Col>
                  </Row>
              </Container>

              <button onClick={sendDataHandler}>Зарегестрироваться</button>
          </div>
      </div>
  )
};