import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState, type MouseEvent, type ReactElement } from 'react';
import styles from './BookingListHeader.module.css';

export type BookingListHeaderFilterOption = 'ALL' | 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';

export interface BookingListHeaderProps {
    selectedFilterOption: BookingListHeaderFilterOption;
    onSelectedFilterOptionChange: (changed: BookingListHeaderFilterOption) => void;
}

export function BookingListHeader({ selectedFilterOption, onSelectedFilterOptionChange }: BookingListHeaderProps): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);
    const handleClose = (): void => setAnchorEl(null);

    const handleSelection = (selection: BookingListHeaderFilterOption): void => {
        onSelectedFilterOptionChange(selection);
        handleClose();
    };

    return (
        <div className={styles.bookingListHeader}>
            <span>
                Zeige: {selectedFilterOption === 'ALL' && 'Alle'}
                {selectedFilterOption === 'OPEN' && 'Offen'}
                {selectedFilterOption === 'IN_PROGRESS' && 'In Bearbeitung'}
                {selectedFilterOption === 'DONE' && 'Fertiggestellt'}
                {selectedFilterOption === 'CANCELED' && 'Abgebrochen'}
            </span>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <FilterListIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem selected={selectedFilterOption === 'ALL'} onClick={(): void => handleSelection('ALL')}>
                    Alle
                </MenuItem>

                <MenuItem selected={selectedFilterOption === 'OPEN'} onClick={(): void => handleSelection('OPEN')}>
                    Offen
                </MenuItem>

                <MenuItem selected={selectedFilterOption === 'IN_PROGRESS'} onClick={(): void => handleSelection('IN_PROGRESS')}>
                    In Bearbeitung
                </MenuItem>

                <MenuItem selected={selectedFilterOption === 'DONE'} onClick={(): void => handleSelection('DONE')}>
                    Fertiggestellt
                </MenuItem>

                <MenuItem selected={selectedFilterOption === 'CANCELED'} onClick={(): void => handleSelection('CANCELED')}>
                    Abgebrochen
                </MenuItem>
            </Menu>
        </div>
    );
}
