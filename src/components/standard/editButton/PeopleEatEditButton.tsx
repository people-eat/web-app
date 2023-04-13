import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PeopleEatIcon from '../icon/PeopleEatIcon';
import IconButton from "@mui/material/Button";

interface IPeopleEatEditButtonProps {
    onClick: () => void;
}

export default function PeopleEatEditButton({ onClick }: IPeopleEatEditButtonProps): ReactElement {
    return (
        <IconButton
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
                height: '40px',
                width: '40px',
                minWidth: '40px',
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
            <PeopleEatIcon icon={Icon.editPencil} className={'cursor-pointer'} edgeLength={24} />
        </IconButton>
    );
}
