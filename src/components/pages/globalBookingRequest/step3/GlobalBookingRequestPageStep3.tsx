import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { type SignedInUser } from '../../../../shared-domain/SignedInUser';
import PEButton from '../../../standard/buttons/PEButton';
import PECheckbox from '../../../standard/checkbox/PECheckbox';
import PEEmailTextField from '../../../standard/textFields/PEEmailTextField';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import PEPhoneNumberTextField from '../../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../../standard/textFields/PETextField';
import VStack from '../../../utility/vStack/VStack';

export interface GlobalBookingRequestPageStep3Props {
    signedInUser?: SignedInUser;
    firstName: string;
    setFirstName: (changedFirstName: string) => void;
    lastName: string;
    setLastName: (changedLastName: string) => void;
    email: string;
    setEmail: (changedEmail: string) => void;
    phoneNumber: string;
    setPhoneNumber: (changedPhoneNumber: string) => void;
    message: string;
    setMessage: (changedMessage: string) => void;
    acceptedPrivacyPolicy: boolean;
    setAcceptedPrivacyPolicy: (changedAcceptedPrivacyPolicy: boolean) => void;
    acceptedTermsAndConditions: boolean;
    setAcceptedTermsAndConditions: (changedAcceptedTermsAndConditions: boolean) => void;
    onContinue: () => void;
}

export default function GlobalBookingRequestPageStep3({
    signedInUser,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    message,
    setMessage,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    acceptedPrivacyPolicy,
    setAcceptedPrivacyPolicy,
    acceptedTermsAndConditions,
    setAcceptedTermsAndConditions,
    onContinue,
}: GlobalBookingRequestPageStep3Props): ReactElement {
    const { t } = useTranslation('global-booking-request');

    const [emailIsValid, setEmailIsValid] = useState(false);
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);

    const disabledForSignedInUser = !acceptedTermsAndConditions || !acceptedPrivacyPolicy;

    const disabledForNewUser =
        firstName.length < 1 ||
        lastName.length < 1 ||
        !emailIsValid ||
        !phoneNumberIsValid ||
        !acceptedTermsAndConditions ||
        !acceptedPrivacyPolicy;

    return (
        <VStack gap={32} className="w-full">
            {!signedInUser && (
                <>
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
                </>
            )}

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
                        label={
                            <p>
                                {t('privacy-policy-label')}{' '}
                                <Link className="text-black" href={'/data-privacy-policy'} target="_blank">
                                    {t('privacy-policy-label-link')}
                                </Link>{' '}
                                {t('privacy-policy-label-2')}
                            </p>
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        sx={{ '& span': { fontSize: '14px' } }}
                        control={<PECheckbox checked={acceptedTermsAndConditions} onCheckedChange={setAcceptedTermsAndConditions} />}
                        label={
                            <p>
                                {t('terms-and-conditions-label')}{' '}
                                <Link className="text-black" href={'/terms-and-conditions'} target="_blank">
                                    {t('terms-and-conditions-label-link')}
                                </Link>{' '}
                                {t('terms-and-conditions-label-2')}
                            </p>
                        }
                    />
                </FormGroup>
            </VStack>

            <PEButton
                onClick={onContinue}
                title={t('send-request-label')}
                disabled={signedInUser ? disabledForSignedInUser : disabledForNewUser}
            />
        </VStack>
    );
}
