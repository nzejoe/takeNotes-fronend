import { useState } from 'react';

const useInput = (getValidInput)=>{
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    // check validity of input value
    const isValid = getValidInput(value);
    
    // this is use for error message flagging
    const hasError = !isValid && isTouched;

    const onChange = (event) => {
        setValue(event.target.value)
        setIsTouched(true)
    }

    const onBlur = () => {
      setIsTouched(true);
    };

    return {
        value,
        isValid,
        hasError,
        onChange,
        onBlur,
    }

}

export default useInput;