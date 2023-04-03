import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { type ReactElement } from 'react';
import { type PeopleEatCheckboxProps } from './PeopleEatCheckboxProps';

export default function PeopleEatCheckbox({ disabled = false, isChecked, onCheckChange }: PeopleEatCheckboxProps): ReactElement {
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: 5,
        width: 24,
        height: 24,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'rgba(255, 100, 51, .5)',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: 'rgba(255, 100, 51, 1)',
        backgroundImage: 'url(./check-white.svg)',
        content: '""',
        boxShadow: '0 0 0 1px rgb(16 22 26 / 0%)',
        '&:before': {
            display: 'block',
            width: 24,
            height: 24,
            content: '""',
        },
    });

    return (
        <Checkbox
            icon={<BpIcon />}
            checkedIcon={<BpCheckedIcon />}
            defaultChecked={isChecked}
            disabled={disabled}
            onChange={(_event, updatedIsChecked): void => onCheckChange(updatedIsChecked)}
        />
    );
}
