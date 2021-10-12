import React from 'react'

import { Authentication, Register } from '../components/Users'

const RegisterPage = () => {
    document.title = "Register | TakeNotes";

    return (
        <div>
            <Authentication>
                <Register/>
            </Authentication>
        </div>
    )
}

export default RegisterPage
