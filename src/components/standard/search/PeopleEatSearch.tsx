import { Input } from '@mui/material';
import classNames from 'classnames';
import { ChangeEvent, useState, type ReactElement } from 'react';
import PeopleEatDatePicker from '../../standard/datePicker/PeopleEatDatePicker';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PeopleEatIcon';
import PeopleEatSearchTab from './PeopleEatSearchTab';

type TInputChangeEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
type TOnChangeFunction = (value: ((prevState: string) => string) | string) => void;

export default function PeopleEatSearch(): ReactElement {
    const temporary = 'absolute left-[50vw] translate-x-[-50%]';
    const [activeTab, setActiveTab] = useState('');
    const [city, setCity] = useState('Rome, Italy.Rome, Italy');
    const [persons, setPersons] = useState('12');
    const [children, setChildren] = useState('3');

    function validateString(value: string): string {
        return value.length > 20 ? value.slice(0, 17) + '...' : value;
    }

    function handleInputChange({ target }: TInputChangeEvent, onChange: TOnChangeFunction): void {
        onChange(target.value);
    }

    return (
        <div
            className={classNames(
                'flex flex-row items-center relative w-[820px] max-w-[820px] h-[73px] bg-white shadow-primary rounded-12',
                temporary,
            )}
        >
            <PeopleEatSearchTab
                setActiveTab={(tab: string): void => setActiveTab(tab)}
                activeTab={activeTab}
                tab={'Your city'}
                className={'after:pl-1 before:rounded-l-12 after:rounded-l-12'}
            >
                {activeTab === 'Your city' ? (
                    <Input
                        onChange={(event): void => handleInputChange(event, setCity)}
                        sx={{ boxSizing: 'border-box', maxHeight: '20px' }}
                        value={city}
                    />
                ) : (
                    validateString('Rome, Italy.Rome, Italy')
                )}
            </PeopleEatSearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PeopleEatSearchTab setActiveTab={(tab: string): void => setActiveTab(tab)} activeTab={activeTab} tab={'Number of persons'}>
                {activeTab === 'Number of persons' ? (
                    <Input
                        onChange={(event): void => handleInputChange(event, setPersons)}
                        sx={{ boxSizing: 'border-box', maxHeight: '20px', minWidth: '40px', width: '40px' }}
                        value={persons}
                    />
                ) : (
                    validateString(persons)
                )}
            </PeopleEatSearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PeopleEatSearchTab setActiveTab={(tab: string): void => setActiveTab(tab)} activeTab={activeTab} tab={'Children'}>
                {activeTab === 'Children' ? (
                    <Input
                        onChange={(event): void => handleInputChange(event, setChildren)}
                        sx={{ boxSizing: 'border-box', maxHeight: '20px', minWidth: '40px', width: '40px', border: '0' }}
                        value={children}
                    />
                ) : (
                    validateString(children)
                )}
            </PeopleEatSearchTab>
            <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" />
            <PeopleEatSearchTab
                setActiveTab={(tab: string): void => setActiveTab(tab)}
                tab={'Date'}
                className={'pr-12 after:pr-[57px] after:-right-2'}
                activeTab={activeTab}
            >
                <PeopleEatDatePicker />
            </PeopleEatSearchTab>
            <div className={'w-[53px] h-[53px] right-3 absolute z-10 cursor-pointer bg-orange rounded-10 flex justify-center items-center'}>
                <PeopleEatIcon icon={Icon.searchBar} />
            </div>
        </div>
    );
}
