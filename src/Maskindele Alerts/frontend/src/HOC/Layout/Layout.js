import React from 'react';
import {Router} from "../Router/Router";
import {NavLink} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export const Layout = () => {

    const history = useHistory();

  const logoutHandler = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');

      history.push('/login');
  };

  return (
      <div className={'Layout'}>
          <div className="Layout__nav">
              <div className="Layout__nav_content">
                  <h3 className={'Layout__nav_logo'}>Maskindele Alerts</h3>

                  {localStorage.token === undefined ?
                      <div className={'Layout__nav_links'}>
                          <NavLink to={'/login'}>Вход</NavLink>
                          <NavLink to={'/'}>Регистрация</NavLink>
                      </div> :
                      <div className={'Layout__nav_links'}>
                          <p>Привет, {localStorage.userName}</p>
                          <p className={'logout-link'} onClick={logoutHandler}>Выйти</p>
                      </div>
                  }
              </div>
          </div>

          <div className="Layout__container">
              <Container>
                  <Router/>
              </Container>
          </div>
      </div>
  )
};
