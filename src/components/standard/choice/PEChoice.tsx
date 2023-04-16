import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PEChoiceProps } from './PEChoiceProps';

export default function PEChoice({ title, onClose }: PEChoiceProps): ReactElement {
    return (
        <div className="relative text-text-m-bold px-4 py-2 bg-base rounded-5 max-w-[130px]">
            <span className="flex items-center flex-row gap-4">
                {title}
                <div onClick={onClose}>
                    <PEIcon icon={Icon.close} className={'cursor-pointer flex items-center'} edgeLength={24} />
                </div>
            </span>
        </div>
    );
}
