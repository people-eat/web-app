import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PECheckbox from '../../../standard/checkbox/PECheckbox';
import PEEmailTextField from '../../../standard/textFields/PEEmailTextField';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import PEPhoneNumberTextField from '../../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../../standard/textFields/PETextField';
import VStack from '../../../utility/vStack/VStack';

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
    const { t } = useTranslation('individual-request');

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
        <VStack gap={32} className="w-full">
            <PETextField value={firstName} onChange={setFirstName} type="text" placeholder={t('first-name-label')} />
            <PETextField value={lastName} onChange={setLastName} type="text" placeholder={t('last-name-label')} />
            <PEEmailTextField
                email={email}
                onChange={(changedEmail, isValid): void => {
                    setEmail(changedEmail);
                    setEmailIsValid(isValid);
                }}
                placeholder={t('email-address-label')}
            />
            <PEPhoneNumberTextField
                phoneNumber={phoneNumber}
                onChange={(changedPhoneNumber, isValid): void => {
                    setPhoneNumber(changedPhoneNumber);
                    setPhoneNumberIsValid(isValid);
                }}
                placeholder={t('phone-number-label')}
            />

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>{t('message-label')}</h3>
                <PEMultiLineTextField value={message} onChange={setMessage} placeholder={t('message-label')} />
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
                        label={t('accept-privacy-policy-label')}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        sx={{ '& span': { fontSize: '14px' } }}
                        control={<PECheckbox checked={acceptedTermsAndConditions} onCheckedChange={setAcceptedTermsAndConditions} />}
                        label={t('accept-terms-and-conditions-label')}
                    />
                </FormGroup>
            </VStack>

            <PEButton onClick={onContinue} title={t('send-request-label')} disabled={disabled} />
        </VStack>
    );
}
