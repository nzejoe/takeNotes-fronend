import React from 'react';

import { Authentication } from '../components/Users';
import { Login } from '../components/Users';

const LoginPage = () => {
    document.title = "Login | TakeNotes";

    return (
        <Authentication>
            <Login/>
        </Authentication>
    );
}

export default LoginPage;
