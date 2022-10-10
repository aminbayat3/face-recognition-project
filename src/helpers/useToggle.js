import { useState } from 'react';

// export const useToggle = () => {
//     const [value, setValue] = useState(false);

//     const toggleCheck = () => {
//         setValue(prevCheck => !prevCheck);
//     }

//     return { toggleCheck, value };
// }

//if we had two or more checkbox in a single component

export const useToggle = (defaultCheckboxValues) => {
    const [value, setValue] = useState(defaultCheckboxValues);

    const toggleValue = (e) => {
        const { name } = e.target;
        setValue(prevValue => ({...value, [name]: !prevValue[name]}));
    }

    return [ toggleValue, value ];
}