import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PECheckboxProps } from './PECheckboxProps';

export default function PECheckbox({ disabled, checked, onCheckedChange }: PECheckboxProps): ReactElement {
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: 5,
        width: 24,
        height: 24,
        maxHeight: 24,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'rgba(255, 255, 255, .5)',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
    }));

    return (
        <section className="w-11 max-h-11">
            <Checkbox
                sx={{ height: '44px' }}
                icon={<BpIcon />}
                checkedIcon={<PEIcon className="bg-orange rounded-md" icon={Icon.checkWhite} />}
                checked={checked}
                onChange={(): void => onCheckedChange(!checked)}
                disabled={disabled}
            />
        </section>
    );
}
