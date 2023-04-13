import { Input } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import PeopleEatDatePicker from '../../standard/datePicker/PeopleEatDatePicker';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PeopleEatIcon';
import PeopleEatAutoComplete from '../../standard/search/PeopleEatAutoComplete';
import PeopleEatSearchTab from './PeopleEatSearchTab';

type TInputChangeEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
type TOnChangeFunction = (value: ((prevState: string) => string) | string) => void;
export interface PeopleEatSearchResult {
    city: string;
    persons: string;
    children: string;
    date: string;
}

interface PeopleEatSearchProps {
    onSearchClick: ({ city, persons, children, date }: PeopleEatSearchResult) => void;
}

export default function PeopleEatSearch({ onSearchClick }: PeopleEatSearchProps): ReactElement {
    const temporary = 'absolute left-[50vw] translate-x-[-50%]';
    const [activeTab, setActiveTab] = useState('');
    const [city, setCity] = useState('Rome, Italy.Rome, Italy');
    const [persons, setPersons] = useState('12');
    const [children, setChildren] = useState('3');
    const [date, setDate] = useState('');
    const [focus, setFocus] = useState(true);

    useEffect(() => {
        document.addEventListener('click', (event) => {
            const classList = (event.target as Element).classList.value;

            if (!classList.includes('people-eat-autocomplete-item') && !classList.includes('MuiInputBase-input')) setFocus(false);
        });
    }, [focus]);

    function handleInputChange({ target }: TInputChangeEvent, onChange: TOnChangeFunction): void {
        onChange(target.value);
    }

    return (
        <div
            className={classNames(
                'flex flex-row items-center relative w-[820px] max-w-[820px] h-[73px] z-50 bg-white shadow-primary rounded-12',
                temporary,
            )}
        >
            <PeopleEatSearchTab
                setActiveTab={(tab: string): void => setActiveTab(tab)}
                activeTab={activeTab}
                tab={'Your city'}
                className={'after:pl-1 before:rounded-l-12 after:rounded-l-12'}
            >
                <>
                    <Input
                        onChange={(event): void => handleInputChange(event, setCity)}
                        sx={{ boxSizing: 'border-box', maxHeight: '20px' }}
                        disableUnderline
                        onFocus={(): void => setFocus(true)}
                        value={city}
                    />
                    {focus ? (
                        <PeopleEatAutoComplete
                            onClick={(value): void => {
                                setCity(value);
                            }}
                        />
                    ) : null}
                </>
            </PeopleEatSearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PeopleEatSearchTab setActiveTab={(tab: string): void => setActiveTab(tab)} activeTab={activeTab} tab={'Number of persons'}>
                <Input
                    onChange={(event): void => handleInputChange(event, setPersons)}
                    sx={{ boxSizing: 'border-box', maxHeight: '20px', minWidth: '40px', width: '40px' }}
                    disableUnderline
                    value={persons}
                />
            </PeopleEatSearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PeopleEatSearchTab setActiveTab={(tab: string): void => setActiveTab(tab)} activeTab={activeTab} tab={'Children'}>
                <Input
                    onChange={(event): void => handleInputChange(event, setChildren)}
                    sx={{ boxSizing: 'border-box', maxHeight: '20px', minWidth: '40px', width: '40px', border: '0' }}
                    disableUnderline
                    value={children}
                />
            </PeopleEatSearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PeopleEatSearchTab
                setActiveTab={(tab: string): void => setActiveTab(tab)}
                tab={'Date'}
                className={'pr-12 after:pr-[57px] after:-right-2'}
                activeTab={activeTab}
            >
                <PeopleEatDatePicker date={dayjs(Date.now())} onChange={(value): void => setDate(String(value))} />
            </PeopleEatSearchTab>
            <div
                onClick={(): void => onSearchClick({ city, persons, children, date })}
                className={'w-[53px] h-[53px] right-3 absolute z-10 cursor-pointer bg-orange rounded-10 flex justify-center items-center'}
            >
                <PeopleEatIcon icon={Icon.searchBar} />
            </div>
        </div>
    );
}
