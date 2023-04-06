import Button from '@mui/material/Button';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';

interface PeopleEatTabItemProps {
    disabled?: boolean;
    title: string;
}

export default function PeopleEatTabItem({ disabled = false, title }: PeopleEatTabItemProps): ReactElement {
    const [selected, setSelect] = useState(false);
    return (
        <Button
            className={classNames('text-black hover:text-white hover:bg-hover pl-5 pr-5 pt-2 pb-2 rounded-5', {
                ['bg-orange text-white']: selected,
            })}
            disabled={Boolean(disabled)}
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            onClick={() => setSelect(!selected)}
        >
            {title}
        </Button>
    );
}
