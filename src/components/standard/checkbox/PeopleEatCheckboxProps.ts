import { type CheckboxProps } from '@mui/material';

export interface PeopleEatCheckboxProps extends CheckboxProps {
    disabled?: boolean;
    isChecked: boolean;
    onCheckChange: (isChecked: boolean) => void;
}
