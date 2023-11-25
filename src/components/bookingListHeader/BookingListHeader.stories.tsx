import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BookingListHeader, type BookingListHeaderFilterOption } from './BookingListHeader';

const meta: Meta<typeof BookingListHeader> = {
    title: 'BookingListHeader',
    component: BookingListHeader,
};

export default meta;

export const Primary: StoryObj<typeof BookingListHeader> = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [filter, setFilter] = useState<BookingListHeaderFilterOption>('ALL');
        return <BookingListHeader selectedFilterOption={filter} onSelectedFilterOptionChange={setFilter} />;
    },
};
