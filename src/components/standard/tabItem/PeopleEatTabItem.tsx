import Button from '@mui/material/Button';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { type PeopleEatTabItemProps } from './PeopleEatTabItemProps';

export default function PeopleEatTabItem({ disabled = false, title, active }: PeopleEatTabItemProps): ReactElement {
    const [selected, setSelect] = useState(active);

    return (
        <Button
            className={classNames('text-black hover:text-white hover:bg-hover pl-5 pr-5 pt-2 pb-2 rounded-5', {
                ['bg-orange text-white']: selected,
            })}
            disabled={Boolean(disabled)}
            onClick={(): void => setSelect(!selected)}
        >
            {title}
        </Button>
    );
}
