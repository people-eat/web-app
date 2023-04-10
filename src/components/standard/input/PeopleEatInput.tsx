import Input from '@mui/joy/Input';
import { type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

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
        <section className={'flex justify-center items-center rounded-3 w-full'}>
            <Input endDecorator={decorator} fullWidth size={'lg'} placeholder="Type in here…" variant="outlined" disabled={disabled} />
        </section>
    );
}
