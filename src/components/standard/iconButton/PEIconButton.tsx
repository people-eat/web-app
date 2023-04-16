import IconButton from '@mui/material/Button';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { type Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';

export interface PEIconButtonProps {
    onClick?: () => void;
    icon: Icon;
    size?: string;
    bg?: string;
    className?: string;
    iconSize?: number;
}

export default function PEIconButton({ onClick, bg, icon, size = '36px', iconSize, className }: PEIconButtonProps): ReactElement {
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
                boxShadow: '0px solid',
                '&:hover': {
                    backgroundColor: bg ?? 'rgba(245, 245, 245, 1)',
                },
                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: '0px solid',
                },
                backgroundColor: bg ?? 'rgba(245, 245, 245, 1)',
                padding: 0,
            }}
            size={'small'}
            variant="contained"
            onClick={onClick}
        >
            <PEIcon icon={icon} className={classNames('cursor-pointer', className)} edgeLength={iconSize ?? 16} />
        </IconButton>
    );
}
