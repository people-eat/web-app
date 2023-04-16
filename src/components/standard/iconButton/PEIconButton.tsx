import Button from '@mui/material/Button';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { type Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';

export interface PEIconButtonProps {
    onClick?: () => void;
    icon: Icon;
    withoutShadow?: boolean;
    border?: string;
    size?: string;
    bg?: string;
    className?: string;
    iconSize?: number;
}

export default function PEIconButton({
    onClick,
    bg,
    withoutShadow,
    icon,
    border,
    size = '36px',
    iconSize,
    className,
}: PEIconButtonProps): ReactElement {
    return (
        <Button
            sx={{
                display: 'flex',
                cursor: 'pointer',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
                height: size,
                width: size,
                border: border ?? '',
                minWidth: size,
                boxShadow: withoutShadow ? '0 0 0 rgba(0, 0, 0, 0)' : '',
                '&:hover': {
                    backgroundColor: bg ?? 'rgba(245, 245, 245, 1)',
                },
                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: withoutShadow ? '0 0 0 rgba(0, 0, 0, 0)' : '',
                },
                backgroundColor: bg ?? 'rgba(245, 245, 245, 1)',
                padding: 0,
            }}
            size={'small'}
            variant="contained"
            onClick={onClick}
        >
            <PEIcon icon={icon} className={classNames('cursor-pointer', className)} edgeLength={iconSize ?? 16} />
        </Button>
    );
}
