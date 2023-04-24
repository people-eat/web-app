import type { Meta, StoryObj } from '@storybook/react';
import PEDropdown from './PEDropdown';

const meta: Meta<typeof PEDropdown> = {
    title: 'Standard Components/PEDropdown',
    component: PEDropdown,
};

export default meta;

export const Component: StoryObj<typeof PEDropdown> = {
    args: {
        title: 'Title',
        defaultExpanded: true,
        options: [
            { id: 'A', value: 'Hello' },
            { id: 'B', value: 'world' },
            { id: 'C', value: '!' },
        ],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        getOptionLabel: (option: any) => option.value,
        onSelectedOptionsChange: (changedSelectedOptions): void => {
            console.log(changedSelectedOptions);
        },
    },
};
