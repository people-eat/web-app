/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import { useState } from 'react';
import IndividualRequestPageStep1 from './IndividualRequestPageStep1';

const meta: Meta<typeof IndividualRequestPageStep1> = {
    title: 'Individual Request Page/Step 1',
    component: IndividualRequestPageStep1,
    render: () => {
        const [adultCount, setAdultCount] = useState(4);
        const [childrenCount, setChildrenCount] = useState(0);
        const [dateTime, setDateTime] = useState(moment());
        const [occasion, setOccasion] = useState('');
        const [budget, setBudget] = useState('');

        const [addressSearchText, setAddressSearchText] = useState<string>('');

        return (
            <IndividualRequestPageStep1
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childrenCount={childrenCount}
                setChildrenCount={setChildrenCount}
                addressSearchText={addressSearchText}
                setAddressSearchText={setAddressSearchText}
                dateTime={dateTime}
                setDateTime={setDateTime}
                occasion={occasion}
                setOccasion={setOccasion}
                budget={budget}
                setBudget={setBudget}
                // eslint-disable-next-line no-alert
                onContinue={(): void => alert('Continue')}
            />
        );
    },
};

export default meta;

export const Component: StoryObj<typeof IndividualRequestPageStep1> = {};
