import { type CheckboxProps } from '@mui/material/Checkbox';

export interface PeopleEatHideButtonProps extends CheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    onClick?: () => void;
}
