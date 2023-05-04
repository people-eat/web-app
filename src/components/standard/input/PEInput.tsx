import { OutlinedInput } from '@mui/material';
import { useState, type ChangeEvent, type ReactElement } from 'react';
import { isEmail } from '../../../utils/isEmail';
import PEHideButton from '../hideButton/PEHideButton';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PEInputProps } from './PEInputProps';

export type TInputChangeEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export default function PEInput({ disabled, placeholder, type, onChange, value }: PEInputProps): ReactElement {
    const [textHidden, setTextHidden] = useState(type === 'password');
    const [isValidEmail, setIsValidEmail] = useState(true);

    let textFieldType = 'text';
    if (type === 'email') textFieldType = 'email';
    if (type === 'password' && textHidden) textFieldType = 'password';

    return (
        <section className={'relative flex justify-center items-center rounded-3 w-full'}>
            <OutlinedInput
                error={!isValidEmail}
                value={value}
                sx={{
                    '&.Mui-focused': {
                        '.MuiOutlinedInput-notchedOutline': {
                            border: '1px solid black',
                            borderColor: 'black',
                        },
                    },
                    borderRadius: '12px',
                    paddingRight: '40px',
                }}
                type={textFieldType}
                disabled={Boolean(disabled)}
                onChange={({ target }: TInputChangeEvent): void => {
                    if (type === 'email') setIsValidEmail(isEmail(target.value));
                    onChange?.(target.value);
                }}
                fullWidth
                required
                placeholder={placeholder ?? ''}
            />
            <span className={'absolute right-2'}>
                {type === 'password' && (
                    <div className={'opacity-50 hover:opacity-100 z-50'}>
                        <PEHideButton onClick={(): void => setTextHidden(!textHidden)} />
                    </div>
                )}
                {type === 'email' &&
                    (isValidEmail ? (
                        <div className="mr-2">
                            <PEIcon icon={Icon.checkGreen} />
                        </div>
                    ) : (
                        <div className="mr-2">
                            <PEIcon icon={Icon.close} />
                        </div>
                    ))}
            </span>
        </section>
    );
}
