import { OutlinedInput } from '@mui/material';
import classNames from 'classnames';
import { useState, type ChangeEvent, type ReactElement } from 'react';
import { isEmail } from '~/utils/isEmail';
import PeopleEatHideButton from '../../standard/hideButton/PeopleEatHideButton';

interface IPeopleEatInputProps {
    disabled?: boolean;
    pass?: boolean;
    email?: boolean;
}

type TInputChangeEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export default function PeopleEatInput({ disabled, pass, email }: IPeopleEatInputProps): ReactElement {
    const [isShowPass, setShowPass] = useState(Boolean(pass));
    const [isError, setError] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [emailValue, setEmail] = useState({ Email: 'your-email@gmail.com', isValidEmail: true });
    const type = isShowPass ? 'password' : email ? 'email' : 'text';

    function handleEmailChange(value: string, isValidEmail: boolean): void {
        setEmail({ Email: value, isValidEmail: isValidEmail });
        setError(!isValidEmail);
    }

    function handleInputChange({ target }: TInputChangeEvent): void {
        if (email) {
            setIsValid(isEmail(target.value));
            handleEmailChange(target.value, isValid);
        }
    }

    const decorator = pass ? (
        <div className={'opacity-50 hover:opacity-100 z-50'}>
            <PeopleEatHideButton onClick={(): void => setShowPass(!isShowPass)} />
        </div>
    ) : email ? (
        <span
            className={classNames('text-disabled', {
                ['text-red-500']: isError,
            })}
        >
            Enter your email
        </span>
    ) : null;

    return (
        <section className={'relative flex justify-center items-center rounded-3 w-full'}>
            <OutlinedInput
                error={isError}
                sx={{
                    borderBottom: 0,
                    '&:hover': {
                        borderBottom: 0,
                    },
                    borderRadius: '12px',
                }}
                type={type}
                disabled={Boolean(disabled)}
                onChange={handleInputChange}
                fullWidth
                required
                placeholder="Type in here..."
            />
            <span className={'absolute right-2'}>{decorator}</span>
        </section>
    );
}
