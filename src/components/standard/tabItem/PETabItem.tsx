import Button from '@mui/material/Button';
import { type ReactElement } from 'react';
import { type PETabItemProps } from './PETabItemProps';

export default function PETabItem({ disabled = false, title, active, onClick }: PETabItemProps): ReactElement {
    return (
        <section>
            <Button
                sx={{
                    backgroundColor: active ? 'rgba(255, 100, 51, 1)' : 'rgba(245, 245, 245, 0.5)',
                    color: active ? 'white' : 'black',
                    borderRadius: '20px',
                    padding: '8px 20px',
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    // '&:hover': {
                    //     backgroundColor: 'rgba(255, 100, 51, .7)',
                    //     color: 'white',
                    // },
                    '@media(max-width: 780px)': {
                        fontSize: 12,
                    },
                }}
                disabled={Boolean(disabled)}
                onClick={onClick}
            >
                {title}
            </Button>
        </section>
    );
}
