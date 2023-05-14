import { useState, type ReactElement } from 'react';
import { isEmail } from '../../../utils/isEmail';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
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
    const [isValid, setIsValid] = useState(true);

    return (
        <PETextField
            value={email}
            onChange={(changedEmail: string, changedIsValid: boolean): void => {
                onChange(changedEmail, changedIsValid);
                setIsValid(changedIsValid);
            }}
            validationRule={isEmail}
            placeholder={placeholder}
            disabled={disabled}
            type="email"
            startContent={undefined}
            endContent={
                <>
                    {isValid && (
                        <div className="mr-2">
                            <PEIcon icon={Icon.checkGreen} />
                        </div>
                    )}
                </>
            }
            style={style}
            className={className}
        />
    );
}
