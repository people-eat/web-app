import IconButton from '@mui/material/Button';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PENextButtonProps } from './PENextButtonProps';

export default function PENextButton({ onClick, reverse, active }: PENextButtonProps): ReactElement {
    return (
        <IconButton
            sx={{
                border: '1px solid rgba(31, 31, 31, 0.1)',
                boxShadow: '0',
                '&:hover': {
                    background: 'transparent',
                    backgroundColor: active ? 'rgba(255, 100, 51, 1)' : 'white',
                    boxShadow: '0',
                },
                '&:active': {
                    boxShadow: '0px 5px 24px rgba(0, 0, 0, 0.08)',
                },
                borderRadius: '8px',
                backgroundColor: active ? 'rgba(255, 100, 51, 1)' : 'white',
                minWidth: '46px',
                height: '46px',
                width: '46px',
                padding: 0,
            }}
            size={'small'}
            variant="contained"
            onClick={onClick}
        >
            <PEIcon
                icon={Icon.arrowRight}
                className={classNames({
                    ['invert']: active,
                    ['rotate-180 ml-[-4px]']: reverse,
                    ['ml-[2px]']: !reverse,
                })}
            />
        </IconButton>
    );
}
