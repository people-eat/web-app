import Button from '@mui/material/Button';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { type PeopleEatTabItemProps } from './PeopleEatTabItemProps';

export default function PeopleEatTabItem({ disabled = false, title, active }: PeopleEatTabItemProps): ReactElement {
    const [selected, setSelect] = useState(active);

    return (
        <section>
            <Button
                sx={{
                    borderRadius: '20px',
                    color: selected ? 'white' : 'black',
                    padding: '8px 20px',
                    '&:hover': {
                        color: 'white',
                        backgroundColor: 'rgba(255, 100, 51, .7)',
                    },
                    backgroundColor: selected ? 'rgba(255, 100, 51, 1)' : 'white',
                }}
                disabled={Boolean(disabled)}
                onClick={(): void => setSelect(!selected)}
            >
                {title}
            </Button>
        </section>
    );
}
