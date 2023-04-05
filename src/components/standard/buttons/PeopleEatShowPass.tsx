import { styled } from '@mui/material';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { type ReactElement } from 'react';

interface IPeopleEatCheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
}

type TPeopleEatCheckboxProps = IPeopleEatCheckboxProps & CheckboxProps;

export default function PeopleEatShowPassword({ disabled = false, defaultChecked = true }: TPeopleEatCheckboxProps): ReactElement {
    const BpIcon = styled('span')(() => ({
        borderRadius: 5,
        width: 24,
        height: 24,
        boxShadow: 'boxShadow: 0 0 0 1px transparent',
        backgroundImage: 'url(./show-password.svg)',
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundImage: 'url(./show-password-checked.svg)',
        content: '""',
        boxShadow: '0 0 0 1px transparent',
        '&:before': {
            display: 'block',
            width: 24,
            height: 24,
            content: '""',
        },
    });

    return <Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} defaultChecked={Boolean(defaultChecked)} disabled={disabled} />;
}
