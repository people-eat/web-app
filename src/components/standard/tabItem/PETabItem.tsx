import Button from '@mui/material/Button';
import { useState, type ReactElement } from 'react';
import { type PETabItemProps } from './PETabItemProps';

export default function PETabItem({ disabled = false, title, active }: PETabItemProps): ReactElement {
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
