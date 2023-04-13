import { type ReactElement } from 'react';
import PeopleEatAutoCompleteItem from '../../standard/search/PeopleEatAutoCompleteItem';

const CITIES = [
    'Moscow town',
    'Perm town',
    'Gilbert town',
    'St Petersburg town',
    'Kazan town',
    'Moscow town',
    'Kirov town',
    'Moscow town',
    'Kishinev town',
    'Moscow town',
    'Sochi town',
];

interface PeopleEatAutoCompleteProps {
    onClick: (value: string) => void;
}

export default function PeopleEatAutoComplete({ onClick }: PeopleEatAutoCompleteProps): ReactElement {
    return (
        <div
            id={'search-autocomplete'}
            className="mt-5 absolute overflow-scroll z-50 w-full h-[380px] min-w-[300px] rounded-4 bg-white shadow-primary"
        >
            <div className="overflow-scroll flex flex-col overscroll-y-auto">
                {CITIES.map((item, index) => (
                    <PeopleEatAutoCompleteItem onClick={onClick} key={`${item}_${index}`} address={item} />
                ))}
            </div>
        </div>
    );
}
