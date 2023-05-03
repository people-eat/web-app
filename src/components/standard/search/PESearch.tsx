import { Input } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import PEDatePicker from '../datePicker/PEDatePicker';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import PEAutoComplete from './PEAutoComplete';
import PESearchTab from './PESearchTab';

type TInputChangeEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
type TOnChangeFunction = (value: ((prevState: string) => string) | string) => void;

export interface PESearchResult {
    city: string;
    persons: string;
    children: string;
    date: string;
}

export interface PESearchProps {
    onSearchClick: ({ city, persons, children, date }: PESearchResult) => void;
}

export default function PESearch({ onSearchClick }: PESearchProps): ReactElement {
    const [activeTab, setActiveTab] = useState('');
    const [city, setCity] = useState('');
    const [persons, setPersons] = useState('4');
    const [children, setChildren] = useState('0');
    const [date, setDate] = useState('');
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (event && event.target) {
                let parentClassList: string | string[] = '';
                const classList = (event.target as Element).classList.value;
                const parent = (event.target as HTMLElement).offsetParent;

                if (parent) parentClassList = parent.classList.value;

                if (!classList.includes('people-eat-autocomplete-item') && !parentClassList?.includes('people-eat-search-input'))
                    setFocus(false);
            }
        });
    }, [focus]);

    function handleInputChange({ target }: TInputChangeEvent, onChange: TOnChangeFunction): void {
        onChange(target.value);
    }

    return (
        <div className="flex flex-row items-center relative w-[820px] h-[73px] z-50 bg-white shadow-primary rounded-12">
            <PESearchTab
                setActiveTab={(tab: string): void => setActiveTab(tab)}
                activeTab={activeTab}
                tab={'Your city'}
                className={'after:pl-1 before:rounded-l-12 after:rounded-l-12'}
            >
                <>
                    <Input
                        onChange={(event): void => handleInputChange(event, setCity)}
                        className={'people-eat-search-input'}
                        sx={{ boxSizing: 'border-box', maxHeight: '20px' }}
                        disableUnderline
                        onFocus={(): void => setFocus(true)}
                        value={city}
                    />
                    {focus ? (
                        <PEAutoComplete
                            onClick={(value): void => {
                                setCity(value);
                            }}
                        />
                    ) : null}
                </>
            </PESearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PESearchTab setActiveTab={(tab: string): void => setActiveTab(tab)} activeTab={activeTab} tab={'Number of persons'}>
                <Input
                    onChange={(event): void => handleInputChange(event, setPersons)}
                    sx={{ boxSizing: 'border-box', maxHeight: '20px', minWidth: '40px', width: '40px' }}
                    disableUnderline
                    value={persons}
                />
            </PESearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PESearchTab setActiveTab={(tab: string): void => setActiveTab(tab)} activeTab={activeTab} tab={'Children'}>
                <Input
                    onChange={(event): void => handleInputChange(event, setChildren)}
                    sx={{ boxSizing: 'border-box', maxHeight: '20px', minWidth: '40px', width: '40px', border: '0' }}
                    disableUnderline
                    value={children}
                />
            </PESearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PESearchTab
                setActiveTab={(tab: string): void => setActiveTab(tab)}
                tab={'Date'}
                className={'pr-12 after:pr-[57px] after:-right-2'}
                activeTab={activeTab}
            >
                <PEDatePicker date={dayjs(Date.now())} onChange={(value): void => setDate(String(value))} />
            </PESearchTab>
            <div
                onClick={(): void => onSearchClick({ city, persons, children, date })}
                className={'w-[53px] h-[53px] right-3 absolute z-10 cursor-pointer bg-orange rounded-10 flex justify-center items-center'}
            >
                <PEIcon icon={Icon.searchBar} />
            </div>
        </div>
    );
}
