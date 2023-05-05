import { type CheckboxProps } from '@mui/material';

export interface PECheckboxProps extends CheckboxProps {
    disabled?: boolean;
    checked?: boolean;
    onCheckedChange?: (changedChecked: boolean) => void;
}
