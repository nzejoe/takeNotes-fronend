import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router'
import axios from 'axios'
import Cookies from 'js-cookie'

import { Authentication } from '.'

const PasswordResetConfirm = () => {
    const [linkIsValid, setLinkIsValid] = useState(true)
    const {uidb64, token} = useParams()

    const history = useHistory()
    
    const sendRequest = async()=>{
        const res = await axios({
          method: "POST",
          url: `accounts/password_reset_confirm/${uidb64}/${token}/`,
          headers: {
            "COntent-type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }).catch((err) => console.log(err));

        // console.log(res);
        const data = JSON.parse(res.data)
        if (data.success){
            const user_id = data.user_id;
            history.replace(`/account/password_reset_complete/${user_id}`);
        }else{
            console.log(res)
            setLinkIsValid(false)
        }
        
    }

    sendRequest()
    return (
        <Authentication>
            {linkIsValid ? (
                <p>Please wait</p>
                ):
                (
                <p>Invalid link</p>
                )
            }
        </Authentication>
    )
}

export default PasswordResetConfirm
