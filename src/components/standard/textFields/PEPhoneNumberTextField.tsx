import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { type ReactElement } from 'react';
import { type PEPhoneNumberTextFieldProps } from './PEPhoneNumberTextFieldProps';

export default function PEPhoneNumberTextField({
    phoneNumber,
    onChange,
    placeholder,
    disabled,
    style,
    className,
}: PEPhoneNumberTextFieldProps): ReactElement {
    return (
        <MuiTelInput
            forceCallingCode
            focusOnSelectCountry
            onlyCountries={['DE', 'GB', 'US', 'FR', 'RU']}
            defaultCountry="DE"
            value={phoneNumber}
            onChange={(changedPhoneNumber): void => onChange(changedPhoneNumber, matchIsValidTel(changedPhoneNumber))}
            placeholder={placeholder}
            disabled={disabled}
            InputProps={{
                sx: {
                    '&.Mui-focused': {
                        '.MuiOutlinedInput-notchedOutline': {
                            border: '1px solid black',
                            borderColor: 'black',
                        },
                    },
                    borderRadius: '12px',
                },
            }}
            style={style}
            className={'w-full' + (className ? ' ' + className : '')}
        />
    );
}
