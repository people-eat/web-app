import Button from '@mui/material/Button';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PENextButtonProps } from './PENextButtonProps';

export default function PENextButton({ onClick, reverse }: PENextButtonProps): ReactElement {
    return (
        <Button
            sx={{
                border: '1px solid rgba(31, 31, 31, 0.1)',
                boxShadow: '0',
                '&:hover': {
                    background: 'transparent',
                    backgroundColor: 'rgba(255, 100, 51, 1)',
                    boxShadow: '0',
                },
                '&:active': {
                    boxShadow: '0px 5px 24px rgba(0, 0, 0, 0.08)',
                },
                borderRadius: '8px',
                backgroundColor: 'white',
                minWidth: '46px',
                height: '46px',
                width: '46px',
                padding: 0,
            }}
            size={'small'}
            variant="contained"
            onClick={onClick}
        >
            <div className="flex w-full h-full hover:invert justify-center items-center">
                <PEIcon
                    icon={Icon.arrowRight}
                    className={classNames({
                        ['rotate-180 ml-[-4px]']: reverse,
                        ['ml-[2px]']: !reverse,
                    })}
                />
            </div>
        </Button>
    );
}
