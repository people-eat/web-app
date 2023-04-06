import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { type ReactElement } from 'react';
import { type PEHideButtonProps } from './PEHideButtonProps';

export default function PEHideButton({
    disabled = false,
    checked: defaultChecked = true,
    onCheckedChange: onClick,
}: PEHideButtonProps): ReactElement {
    const BpIcon = styled('span')(() => ({
        borderRadius: 5,
        width: 24,
        height: 24,
        boxShadow: 'boxShadow: 0 0 0 1px transparent',
        backgroundImage: 'url(/icons/eye-crossed-out.svg)',
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundImage: 'url(/icons/eye.svg)',
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
                checked={Boolean(defaultChecked)}
                disabled={disabled}
            />
        </div>
    );
}
