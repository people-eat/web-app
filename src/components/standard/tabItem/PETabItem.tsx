import Button from '@mui/material/Button';
import { type ReactElement } from 'react';
import { type PETabItemProps } from './PETabItemProps';

export default function PETabItem({ disabled = false, title, active, onClick }: PETabItemProps): ReactElement {
    return (
        <section>
            <Button
                sx={{
                    borderRadius: '20px',
                    color: active ? 'white' : 'black',
                    padding: '8px 20px',
                    whiteSpace: 'nowrap',
                    '@media(max-width: 780px)': {
                        fontSize: 12,
                    },
                    '&:hover': {
                        color: 'white',
                        backgroundColor: 'rgba(255, 100, 51, .7)',
                    },
                    textTransform: 'none',
                    backgroundColor: active ? 'rgba(255, 100, 51, 1)' : 'rgba(245, 245, 245, 0.5)',
                }}
                disabled={Boolean(disabled)}
                onClick={onClick}
            >
                {title}
            </Button>
        </section>
    );
}
