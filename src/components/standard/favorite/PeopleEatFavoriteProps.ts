import { type CheckboxProps } from '@mui/material/Checkbox';

export interface PeopleEatFavoriteProps extends CheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
}
