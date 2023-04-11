import { OutlinedInput } from '@mui/material';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PeopleEatIcon from '../icon/PeopleEatIcon';

interface IPeopleEatInputProps {
    disabled?: boolean;
    pass?: boolean;
    email?: boolean;
}

export default function PeopleEatInput({ disabled, pass, email }: IPeopleEatInputProps): ReactElement {
    const decorator = pass ? (
        <PeopleEatIcon icon={Icon.eye} className="opacity-50" />
    ) : email ? (
        <span className="text-disabled">Enter yor email</span>
    ) : null;

    return (
        <section className={'relative flex justify-center items-center rounded-3 w-full'}>
            <OutlinedInput
                sx={{
                    borderBottom: 0,
                    '&:hover': {
                        borderBottom: 0,
                    },
                    borderRadius: '12px',
                }}
                disabled={Boolean(disabled)}
                fullWidth
                placeholder="Type in here…"
                variant="outlined"
            />
            <span className={'absolute right-4'}>{decorator}</span>
        </section>
    );
}
