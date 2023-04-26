/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import { useState, type ReactElement } from 'react';
import { type AddressSearchResult } from './AddressSearchResult';
import HomePageSearch, { type HomePageSearchProps } from './HomePageSearch';

const meta: Meta<typeof HomePageSearch> = {
    title: 'Home Page/Search',
    component: HomePageSearch,
};

export default meta;

const cities: AddressSearchResult[] = [
    { label: 'Chelmsford', location: { latitude: 0, longitude: 0 } },
    { label: 'Leicester', location: { latitude: 0, longitude: 0 } },
    { label: 'Worcester', location: { latitude: 0, longitude: 0 } },
    { label: 'Winchester', location: { latitude: 0, longitude: 0 } },
    { label: 'Ely', location: { latitude: 0, longitude: 0 } },
    { label: 'Cambridge', location: { latitude: 0, longitude: 0 } },
    { label: 'Derby', location: { latitude: 0, longitude: 0 } },
    { label: 'Ripon', location: { latitude: 0, longitude: 0 } },
];

export const Component: StoryObj<typeof HomePageSearch> = {
    parameters: {
        controls: {
            exclude: /.*/g,
        },
    },
    render: (_props: HomePageSearchProps): ReactElement => {
        const [addressSearchText, setAddressSearchText] = useState('');
        const [adultCount, setAdultCount] = useState(4);
        const [childrenCount, setChildrenCount] = useState(0);
        const [date, setDate] = useState(moment());
        const [searchResults, setSearchResults] = useState<AddressSearchResult[]>([]);

        return (
            <HomePageSearch
                addressSearchText={addressSearchText}
                onAddressSearchTextChange={(changedSearchText): void => {
                    setAddressSearchText(changedSearchText);
                    if (!changedSearchText) {
                        setSearchResults([]);
                        return;
                    }
                    setSearchResults(cities.filter((city) => city.label.toLowerCase().includes(changedSearchText.toLowerCase())));
                }}
                adultCount={adultCount}
                onAdultsChange={setAdultCount}
                childrenCount={childrenCount}
                onChildrenChange={setChildrenCount}
                date={date}
                onDateChange={setDate}
                searchResults={searchResults}
                // eslint-disable-next-line no-alert
                onSearchResultSelect={(selectedSearchResult): void => alert(JSON.stringify(selectedSearchResult))}
                onSearch={(): void => undefined}
            />
        );
    },
};
