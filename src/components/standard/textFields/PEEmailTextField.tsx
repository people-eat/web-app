import { type ReactElement } from 'react';
import { isEmail } from '../../../utils/isEmail';
import { type PEEmailTextFieldProps } from './PEEmailTextFieldProps';
import PETextField from './PETextField';

export default function PEEmailTextField({
    email,
    onChange,
    placeholder,
    disabled,
    style,
    className,
}: PEEmailTextFieldProps): ReactElement {
    return (
        <PETextField
            value={email}
            onChange={onChange}
            validationRule={isEmail}
            placeholder={placeholder}
            disabled={disabled}
            type="email"
            startContent={undefined}
            endContent={undefined}
            style={style}
            className={className}
        />
    );
}
