import { useState, type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

interface IPeopleEatChoiceProps {
    title: string;
    onClose: () => void;
}

export default function PeopleEatChoice({ title, onClose}: IPeopleEatChoiceProps): ReactElement {
    return (
        <span className="flex flex-1 flex-row gap-3 px-4 py-2 bg-base rounded-5">
            <span className="text-text-m-bold">{title}</span> <PeopleEatIcon icon={Icon.close} className={'cursor-pointer'} onClick={onClose} edgeLength={24} />
        </span>
    );
}
