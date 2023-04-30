import { type CheckboxProps } from '@mui/material/Checkbox';

export interface PEFavoriteProps extends CheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    className?: string;
    onClick?: () => void;
}
