import type dayjs from 'dayjs';

export interface PEDatePickerProps {
    date?: dayjs.Dayjs;
    onChange: (date?: dayjs.Dayjs) => void;
}
