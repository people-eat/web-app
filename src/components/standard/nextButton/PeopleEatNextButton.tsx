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
                padding: 0,
            }}
            size={'small'}
            variant="contained"
            onClick={handleClick}
            className={'min-w-[46px] max-w-[46px] min-h-[46px] h-[46px] '}
        >
            <PeopleEatIcon icon={Icon.arrowRight} className={classNames('', { ['invert']: active })} edgeLength={46} />
        </IconButton>
    );
}
