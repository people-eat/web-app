import { type ReactElement } from 'react';

interface PeopleEatAutoCompleteItemProps {
    address: string;
    onClick: (value: string) => void;
}

export default function PEAutoComplete({ address, onClick }: PeopleEatAutoCompleteItemProps): ReactElement {
    return (
        <div
            onClick={(): void => {
                onClick(address);
            }}
            className="people-eat-autocomplete-item flex flex-col w-full h-[50px] border-b-solid  box-border px-4 pt-2 hover:bg-midBlackHover flex items-start"
        >
            <span className="people-eat-autocomplete-item">{address}</span>
            <span className="people-eat-autocomplete-item text-text-s text-disabled">{address}</span>
        </div>
    );
}
