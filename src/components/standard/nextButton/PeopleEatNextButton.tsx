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
            sx={{ border: 1, '$hover:': { backgroundColor: 'white' } }}
            size={'small'}
            variant="contained"
            onClick={handleClick}
            className={classNames(
                'min-w-[46px] max-w-[46px] min-h-[46px] h-[46px] hover:bg-orange p-0 border-border hover:border-transparent',
                {
                    ['bg-white hover:bg-white']: !active,
                    ['bg-orange']: active,
                },
            )}
        >
            <PeopleEatIcon icon={Icon.arrowRight} className={classNames('', { ['invert']: active })} edgeLength={46} />
        </IconButton>
    );
}
