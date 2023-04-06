import IconButton from '@mui/material/Button';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

interface IPeopleEatNextProps {
    onClick?: () => void;
}

export default function PeopleEatNext({ onClick }: IPeopleEatNextProps): ReactElement {
    const [active, setActive] = useState(false);

    function handleClick(): void {
        setActive(!active);
        if (onClick) onClick();
    }

    return (
        <IconButton
            sx={{ border: 1, '$hover:': { backgroundColor: 'transparent' } }}
            size={'small'}
            variant="contained"
            onClick={handleClick}
            className={classNames('min-w-[46px] min-h-[46px] hover:bg-orange p-0 border-border hover:border-transparent', {
                ['hover:bg-white']: !active,
                ['bg-orange']: active,
            })}
        >
            <PeopleEatIcon icon={Icon.arrowRight} classes={classNames('', { ['invert']: active })} edgeLength={46} />
        </IconButton>
    );
}
