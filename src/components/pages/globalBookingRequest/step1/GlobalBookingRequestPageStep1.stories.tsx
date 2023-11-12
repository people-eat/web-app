/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import { useState } from 'react';
import { type GlobalBookingRequestPriceClassType } from '../../../../data-source/generated/graphql';
import GlobalBookingRequestPageStep1 from './GlobalBookingRequestPageStep1';

const meta: Meta<typeof GlobalBookingRequestPageStep1> = {
    title: 'Global Booking Request Page/Step 1',
    component: GlobalBookingRequestPageStep1,
    render: () => {
        const [adultCount, setAdultCount] = useState(4);
        const [childrenCount, setChildrenCount] = useState(0);
        const [dateTime, setDateTime] = useState(moment());
        const [occasion, setOccasion] = useState('');
        const [priceClassType, setPriceClassType] = useState<GlobalBookingRequestPriceClassType>('GOURMET');

        const [addressSearchText, setAddressSearchText] = useState<string>('');

        return (
            <GlobalBookingRequestPageStep1
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childrenCount={childrenCount}
                setChildrenCount={setChildrenCount}
                addressSearchText={addressSearchText}
                setAddressSearchText={setAddressSearchText}
                setSelectedLocation={(): void => undefined}
                dateTime={dateTime}
                setDateTime={setDateTime}
                occasion={occasion}
                setOccasion={setOccasion}
                priceClassType={priceClassType}
                setPriceClassType={setPriceClassType}
                // eslint-disable-next-line no-alert
                onContinue={(): void => alert('Continue')}
            />
        );
    },
};

export default meta;

export const Component: StoryObj<typeof GlobalBookingRequestPageStep1> = {};
