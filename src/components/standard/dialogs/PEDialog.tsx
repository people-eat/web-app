import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { type TransitionProps } from '@mui/material/transitions';
import { DatePicker } from '@mui/x-date-pickers';
import classNames from 'classnames';
import { type Moment } from 'moment/moment';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { forwardRef, useEffect, useState, type ReactElement } from 'react';
import { type AddressSearchResult } from '../../pages/home/search/AddressSearchResult';
import { type HomePageSearchProps } from '../../pages/home/search/HomePageSearch';
import PEButton from '../../standard/buttons/PEButton';
import { Icon } from '../../standard/icon/Icon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import Spacer from '../../utility/spacer/Spacer';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return (
        <Slide direction="up" ref={ref} {...props}>
            {props.children}
        </Slide>
    );
});

export interface PEFullScreenDialog extends HomePageSearchProps {
    isOpen?: boolean;
    onClick: (flag: boolean) => void;
}

export default function PEFullScreenDialog({
    isOpen,
    onClick,
    addressSearchText,
    onAddressSearchTextChange,
    adultCount,
    onAdultsChange,
    childrenCount,
    onChildrenChange,
    date,
    onDateChange,
    searchResults,
    onSearchResultSelect,
    onSearch,
}: PEFullScreenDialog): ReactElement {
    const [open, setOpen] = useState(Boolean(isOpen));
    const { t } = useTranslation('home');

    useEffect(() => {
        setOpen(Boolean(isOpen));
    }, [isOpen]);

    const handleClose = (): void => {
        setOpen(false);
        onClick(false);
    };

    return (
        <div
            className={classNames({
                ['absolute top-10 h-screen w-full']: isOpen,
            })}
        >
            <Dialog
                sx={{
                    height: '100vh',
                    width: '100%',
                    minHeight: '90%',
                    minWidth: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    '& .MuiPaper-root': {
                        margin: '5vh 0 0',
                        borderRadius: '16px 16px 0 0',
                        padding: '16px',
                        boxSizing: 'border-box',
                        minHeight: '95vh',
                        minWidth: '100%',
                    },
                }}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="draggable-dialog-component"
            >
                <List
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        minHeight: '90%',
                        minWidth: '100%',
                        height: '80vh',
                    }}
                >
                    <div>
                        <div className="absolute right-0 top-4">
                            <PEIconButton withoutShadow iconSize={24} bg={'white'} onClick={handleClose} icon={Icon.close} />
                        </div>
                        <p className="text-text-m-bold mb-8">Filters</p>
                        <div>
                            <p className="text-text-sm-bold">{t('search-city-label')}</p>
                            <Autocomplete
                                sx={{
                                    width: '100%',
                                    border: '1px solid rgba(31, 31, 31, 0.2)',
                                    '&.Mui-focused': {
                                        border: '1px solid black',
                                    },
                                    borderRadius: '12px',
                                    padding: '8px 16px',
                                    boxSizing: 'border-box',
                                }}
                                freeSolo
                                disableClearable
                                options={searchResults}
                                onChange={(_event, selectedSearchResult): void => {
                                    if (typeof selectedSearchResult === 'string') return;
                                    onSearchResultSelect(selectedSearchResult);
                                }}
                                inputValue={addressSearchText}
                                onInputChange={(_event, value): void => onAddressSearchTextChange(value)}
                                filterOptions={(options): AddressSearchResult[] => options}
                                renderInput={(params): ReactElement => (
                                    <TextField
                                        {...params}
                                        sx={{
                                            '&.Mui-focused': {
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: '1px solid black',
                                                },
                                            },
                                        }}
                                        variant="standard"
                                        InputProps={{ disableUnderline: true, ...params.InputProps }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            />
                        </div>
                        <p className="text-text-sm-bold">{t('search-adults-label')}</p>
                        <TextField
                            sx={{
                                width: '100%',
                                border: '1px solid rgba(31, 31, 31, 0.2)',
                                '&.Mui-focused': {
                                    border: '1px solid black',
                                    borderColor: 'black',
                                },
                                borderRadius: '12px',
                                padding: '8px 16px',
                                boxSizing: 'border-box',
                            }}
                            value={adultCount}
                            onChange={(event): void => {
                                onAdultsChange(Number(event.target.value));
                            }}
                            variant="standard"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                            InputProps={{ disableUnderline: true }}
                        />
                        <p className="text-text-sm-bold">{t('search-children-label')}</p>
                        <TextField
                            sx={{
                                width: '100%',
                                border: '1px solid rgba(31, 31, 31, 0.2)',
                                '&.Mui-focused': {
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: '1px solid black',
                                    },
                                },
                                borderRadius: '12px',
                                padding: '8px 16px',
                                boxSizing: 'border-box',
                            }}
                            value={childrenCount}
                            onChange={(event): void => {
                                onChildrenChange(Number(event.target.value));
                            }}
                            variant="standard"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                            InputProps={{ disableUnderline: true }}
                        />
                        <p className="text-text-sm-bold">{t('search-date-label')}</p>
                        <DatePicker
                            sx={{
                                width: '100%',
                                border: '1px solid rgba(31, 31, 31, 0.2)',
                                '&.Mui-focused': {
                                    border: '1px solid black',
                                },
                                borderRadius: '12px',
                                padding: '8px 16px',
                                boxSizing: 'border-box',
                            }}
                            value={date}
                            onChange={(changedDate: Moment | null): void => {
                                if (changedDate) onDateChange(changedDate);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                        />
                    </div>
                    <Spacer />
                    <PEButton disabled={!addressSearchText || !date || !adultCount} onClick={onSearch} title={'Search'} />
                </List>
            </Dialog>
        </div>
    );
}
