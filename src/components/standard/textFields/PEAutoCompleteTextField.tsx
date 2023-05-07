import { type ReactElement } from 'react';
import { type PEPhoneNumberProps } from './PEPhoneNumberProps';
import PETextField from './PETextField';

export default function PEAutoCompleteTextField({
    phoneNumber,
    onChange,
    placeholder,
    disabled,
    style,
    className,
}: PEPhoneNumberProps): ReactElement {
    return (
        <PETextField
            value={phoneNumber}
            onChange={onChange}
            validationRule={undefined}
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
