import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {SignUp} from "../../components/Auth/SignUp";
import {SignIn} from "../../components/Auth/SignIn";
import {Main} from "../../components/Main/Main";

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <SignUp />
            </Route>
            <Route path={'/login'}>
                <SignIn />
            </Route>
            <Route path={'/home'}>
                <Main />
            </Route>
        </Switch>
    )
};