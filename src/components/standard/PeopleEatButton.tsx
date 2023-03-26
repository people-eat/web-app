import Button from '@mui/material/Button';
import { type ReactElement } from 'react';

export default function PeopleEatButton(): ReactElement {
    return (
        <Button variant="contained" style={{ backgroundColor: 'orange' }}>
            Click me
        </Button>
    );
}
