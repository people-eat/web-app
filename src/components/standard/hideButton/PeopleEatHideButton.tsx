import { styled } from '@mui/material';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import { type ReactElement } from 'react';

interface IPeopleEatCheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    onClick: () => void;
}

type TPeopleEatCheckboxProps = IPeopleEatCheckboxProps & CheckboxProps;

export default function PeopleEatHideButton({ disabled = false, defaultChecked = true, onClick }: TPeopleEatCheckboxProps): ReactElement {
    const BpIcon = styled('span')(() => ({
        borderRadius: 5,
        width: 24,
        height: 24,
        boxShadow: 'boxShadow: 0 0 0 1px transparent',
        backgroundImage: 'url(/public/icons/eye-crossed-out.svg)',
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundImage: 'url(/public/icons/eye.svg)',
        content: '""',
        boxShadow: '0 0 0 1px transparent',
        '&:before': {
            display: 'block',
            width: 24,
            height: 24,
            content: '""',
        },
    });

    return (
        <div>
            <Checkbox
                onClick={onClick}
                icon={<BpIcon />}
                checkedIcon={<BpCheckedIcon />}
                defaultChecked={Boolean(defaultChecked)}
                disabled={disabled}
            />
        </div>
    );
}
