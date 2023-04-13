import type dayjs from 'dayjs';

export interface PeopleEatDatePickerProps {
    date?: dayjs.Dayjs;
    onChange: (date?: dayjs.Dayjs) => void;
}
