import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { type PEFavoriteProps } from './PEFavoriteProps';

export default function PEFavorite({ disabled = false, defaultChecked = true, className, onClick }: PEFavoriteProps): ReactElement {
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
        <section onClick={onClick} className={classNames('w-10_ h-10_ rounded-2', className)}>
            <Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} defaultChecked={Boolean(defaultChecked)} disabled={disabled} />
        </section>
    );
}
