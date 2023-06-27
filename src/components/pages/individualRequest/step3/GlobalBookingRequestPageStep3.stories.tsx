/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import GlobalBookingRequestPageStep3 from './GlobalBookingRequestPageStep3';

const meta: Meta<typeof GlobalBookingRequestPageStep3> = {
    title: 'Global Booking Request Page/Step 3',
    component: GlobalBookingRequestPageStep3,
    render: () => {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [message, setMessage] = useState('');

        const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false);
        const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

        return (
            <GlobalBookingRequestPageStep3
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                message={message}
                setMessage={setMessage}
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

export const Component: StoryObj<typeof GlobalBookingRequestPageStep3> = {};
