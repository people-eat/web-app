/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import IndividualRequestPageStep3 from './IndividualRequestPageStep3';

const meta: Meta<typeof IndividualRequestPageStep3> = {
    title: 'Individual Request Page/Step 3',
    component: IndividualRequestPageStep3,
    render: () => {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [emailIsValid, setEmailIsValid] = useState(false);
        const [phoneNumber, setPhoneNumber] = useState('');
        const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);

        const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false);
        const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

        return (
            <IndividualRequestPageStep3
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                emailIsValid={emailIsValid}
                setEmailIsValid={setEmailIsValid}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                phoneNumberIsValid={phoneNumberIsValid}
                setPhoneNumberIsValid={setPhoneNumberIsValid}
                acceptedPrivacyPolicy={acceptedPrivacyPolicy}
                setAcceptedPrivacyPolicy={setAcceptedPrivacyPolicy}
                acceptedTermsAndConditions={acceptedTermsAndConditions}
                setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
                // eslint-disable-next-line no-alert
                onContinue={(): void => alert('Continue')}
            />
        );
    },
};

export default meta;

export const Component: StoryObj<typeof IndividualRequestPageStep3> = {};
