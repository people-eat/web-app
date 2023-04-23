import IconButton from '@mui/material/Button';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PeopleEatIcon from '../icon/PeopleEatIcon';

interface PeopleEatIconButtonProps {
    onClick: () => void;
    icon: Icon;
    size?: string;
    iconSize?: number;
}

export default function PeopleEatIconButton({ onClick, icon, size = '36px', iconSize = 16 }: PeopleEatIconButtonProps): ReactElement {
    return (
        <IconButton
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
                height: size,
                width: size,
                minWidth: size,
                '&:hover': {
                    backgroundColor: 'rgba(245, 245, 245, 1)',
                },
                backgroundColor: 'rgba(245, 245, 245, 1)',
                padding: 0,
            }}
            size={'small'}
            variant="contained"
            onClick={onClick}
        >
            <PeopleEatIcon icon={icon} className={'cursor-pointer'} edgeLength={iconSize} />
        </IconButton>
    );
}
