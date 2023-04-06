import { type CheckboxProps } from '@mui/material/Checkbox';

export interface PEHideButtonProps extends CheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    onClick?: () => void;
}
