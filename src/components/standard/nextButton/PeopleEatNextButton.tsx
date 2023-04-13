import IconButton from '@mui/material/Button';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PeopleEatIcon from '../icon/PeopleEatIcon';
import { type PeopleEatNextButtonProps } from './PeopleEatNextButtonProps';

export default function PeopleEatNextButton({ onClick }: PeopleEatNextButtonProps): ReactElement {
    const [active, setActive] = useState(false);

    function handleClick(): void {
        setActive(!active);
        if (onClick) onClick();
    }

    return (
        <IconButton
            sx={{
                border: '1px solid rgba(31, 31, 31, 0.1)',
                '&:hover': {
                    background: 'transparent',
                    backgroundColor: active ? 'rgba(255, 100, 51, 1)' : 'white',
                },
                backgroundColor: active ? 'rgba(255, 100, 51, 1)' : 'white',
                minWidth: '46px',
                height: '46px',
                width: '46px',
                padding: 0,
            }}
            size={'small'}
            variant="contained"
            onClick={handleClick}
        >
            <PeopleEatIcon icon={Icon.arrowRight} className={classNames('', { ['invert']: active })} edgeLength={24} />
        </IconButton>
    );
}
