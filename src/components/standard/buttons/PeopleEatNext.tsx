import IconButton from '@mui/material/Button';
import { type ReactElement } from 'react';
import { IconsList, PeopleEatIcon } from '~/components/standard/icon/PeopleEatIcon';

export default function PeopleEatNext(): ReactElement {
    return (
        <IconButton
            sx={{ border: 1 }}
            size={'small'}
            variant="contained"
            className="min-w-[46px] hover:bg-orange p-0 border-border hover:border-transparent"
        >
            <PeopleEatIcon icon={IconsList.arrowRight} Classes={'hover:invert'} height={46} width={46} />
        </IconButton>
    );
}
