import React from 'react';

import { Authentication } from '../components/Users';
import { Login } from '../components/Users';

const LoginPage = () => {
    document.title = "Login | TakeNotes";

    return (
      <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <Authentication>
            <Login/>
        </Authentication>
      </div>
    );
}

export default LoginPage;
