import IconButton from '@mui/material/Button';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PeopleEatIcon from '../icon/PeopleEatIcon';

interface IPeopleEatCameraButtonProps {
    onClick: () => void;
}

export default function PeopleEatCameraButton({ onClick }: IPeopleEatCameraButtonProps): ReactElement {
    return (
        <IconButton
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
                height: '36px',
                width: '36px',
                minWidth: '36px',
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
            <PeopleEatIcon icon={Icon.camera} className={'cursor-pointer'} edgeLength={16} />
        </IconButton>
    );
}
