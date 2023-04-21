import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ReactElement } from 'react';

export default function PeopleEatDatePicker(): ReactElement {
    return (
        <>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="de"
                localeText={{ clearButtonLabel: 'Empty', todayButtonLabel: 'Now' }}
            >
                <DatePicker
                    sx={{
                        background: 'transparent',
                        backgroundColor: 'transparent',
                        height: '40px',
                        maxWidth: '140px',
                        minHeight: '40px',
                    }}
                    format={'DD-MM-YYYY'}
                    disablePast={true}
                    slotProps={{
                        textField: {
                            sx: {
                                maxWidth: '155px',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: '0px solid ',
                                    },
                                    '&:hover fieldset': {
                                        border: '0px solid rgba(245, 245, 245, 1)',
                                        borderWidth: '0',
                                        borderColor: 'rgba(245, 245, 245, 1)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: '0px solid',
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '0px',
                                    },
                                },
                            },
                            size: 'small',
                        },
                    }}
                />
            </LocalizationProvider>
        </>
    );
}
