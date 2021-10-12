import { useState } from 'react';

const useInput = (getValidInput)=>{
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    // check validity of input value
    const isValid = getValidInput(value);

    const hasError = !isValid && isTouched;

    const handleValueChange = (event) => {
        setValue(event.target.value)
        setIsTouched(true)
    }

    const onValueBlur = () => {
        setIsTouched(true)
    }

    return {
        value,
        hasError,
        handleValueChange,
        onValueBlur,
    }

}

export default useInput;