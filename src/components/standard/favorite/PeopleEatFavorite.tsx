import { styled } from '@mui/material';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import { type ReactElement } from 'react';

interface IPeopleEatFavoriteProps {
    disabled?: boolean;
    defaultChecked?: boolean;
}

type TPeopleEatFavoriteProps = IPeopleEatFavoriteProps & CheckboxProps;

export default function PeopleEatFavorite({ disabled = false, defaultChecked = true }: TPeopleEatFavoriteProps): ReactElement {
    const BpIcon = styled('span')(() => ({
        borderRadius: 5,
        width: 24,
        height: 24,
        boxShadow: 'boxShadow: 0 0 0 1px transparent',
        backgroundImage: 'url(/icons/heart.svg)',
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundImage: 'url(/icons/heart-full.svg)',
        content: '""',
        boxShadow: '0 0 0 1px transparent',
        '&:before': {
            display: 'block',
            width: 24,
            height: 24,
            content: '""',
        },
    });

    return (
        <section className={'bg-base w-10 h-10 rounded-2'}>
            <Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} defaultChecked={Boolean(defaultChecked)} disabled={disabled} />
        </section>
    );
}
