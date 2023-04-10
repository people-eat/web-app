import { type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

interface IPeopleEatChoiceProps {
    title: string;
    onClose: () => void;
}

export default function PeopleEatChoice({ title, onClose }: IPeopleEatChoiceProps): ReactElement {
    return (
        <div className="relative text-text-m-bold px-4 py-2 bg-base rounded-5 max-w-[130px]">
            <span className="flex items-center flex-row gap-4">
                {title}
                <PeopleEatIcon icon={Icon.close} className={'cursor-pointer flex items-center'} onClick={onClose} edgeLength={24} />
            </span>
        </div>
    );
}
