import { FormControlLabel, FormGroup } from '@mui/material';
import { useState, type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PECheckbox from '../../../standard/checkbox/PECheckbox';
import PEEmailTextField from '../../../standard/textFields/PEEmailTextField';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import PEPhoneNumberTextField from '../../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../../standard/textFields/PETextField';
import VStack from '../../../utility/vStack/VStack';
import { firstNameTitle, lastNameTitle, messageTitle, phoneTitle, privacyPolicy, sendRequest, termsAndConditions } from '../points.mock';

export interface IndividualRequestPageStepThreeProps {
    firstName: string;
    setFirstName: (changedFirstName: string) => void;
    lastName: string;
    setLastName: (changedLastName: string) => void;
    email: string;
    setEmail: (changedEmail: string) => void;
    emailIsValid: boolean;
    setEmailIsValid: (changedEmailIsValid: boolean) => void;
    phoneNumber: string;
    setPhoneNumber: (changedPhoneNumber: string) => void;
    phoneNumberIsValid: boolean;
    setPhoneNumberIsValid: (changedPhoneNumberIsValid: boolean) => void;
    message: string;
    setMessage: (changedMessage: string) => void;
    acceptedPrivacyPolicy: boolean;
    setAcceptedPrivacyPolicy: (changedAcceptedPrivacyPolicy: boolean) => void;
    acceptedTermsAndConditions: boolean;
    setAcceptedTermsAndConditions: (changedAcceptedTermsAndConditions: boolean) => void;
    onContinue: () => void;
}

export default function IndividualRequestPageStep3({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    message,
    setMessage,
    setEmail,
    // emailIsValid,
    // setEmailIsValid,
    phoneNumber,
    setPhoneNumber,
    // phoneNumberIsValid,
    // setPhoneNumberIsValid,
    acceptedPrivacyPolicy,
    setAcceptedPrivacyPolicy,
    acceptedTermsAndConditions,
    setAcceptedTermsAndConditions,
    onContinue,
}: IndividualRequestPageStepThreeProps): ReactElement {
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [_phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);

    const disabled =
        firstName.length < 1 ||
        lastName.length < 1 ||
        !emailIsValid ||
        // (!phoneNumberIsValid && phoneNumber.length > 2) ||
        !acceptedTermsAndConditions ||
        !acceptedPrivacyPolicy;

    return (
        <>
            <PETextField value={firstName} onChange={setFirstName} type="text" placeholder={firstNameTitle} />
            <PETextField value={lastName} onChange={setLastName} type="text" placeholder={lastNameTitle} />
            <PEEmailTextField
                email={email}
                onChange={(changedEmail, isValid): void => {
                    setEmail(changedEmail);
                    setEmailIsValid(isValid);
                }}
                placeholder="Email"
            />
            <PEPhoneNumberTextField
                phoneNumber={phoneNumber}
                onChange={(changedPhoneNumber, isValid): void => {
                    setPhoneNumber(changedPhoneNumber);
                    setPhoneNumberIsValid(isValid);
                }}
                placeholder={phoneTitle}
            />

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>{messageTitle}</h3>
                <PEMultiLineTextField value={message} onChange={setMessage} placeholder={messageTitle} />
            </VStack>

            <VStack
                className="w-full"
                style={{
                    alignItems: 'flex-start',
                    padding: '16px',
                    border: '1px solid rgba(31, 31, 31, 0.2)',
                    boxSizing: 'border-box',
                    borderRadius: '16px',
                }}
            >
                <FormGroup>
                    <FormControlLabel
                        sx={{ '& span': { fontSize: '14px' } }}
                        control={<PECheckbox checked={acceptedPrivacyPolicy} onCheckedChange={setAcceptedPrivacyPolicy} />}
                        label={privacyPolicy}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        sx={{ '& span': { fontSize: '14px' } }}
                        control={<PECheckbox checked={acceptedTermsAndConditions} onCheckedChange={setAcceptedTermsAndConditions} />}
                        label={termsAndConditions}
                    />
                </FormGroup>
            </VStack>

            <PEButton onClick={onContinue} title={sendRequest} disabled={disabled} />
        </>
    );
}
