import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEMealComponentProps {
    onClick?: () => void;
    mealTitle?: string;
    mealDescription?: string;
    mealPicture?: string;
}

export default function PEMealComponent({ onClick, mealTitle, mealDescription, mealPicture }: PEMealComponentProps): ReactElement {
    return (
        <div
            onClick={(): void => onClick?.()}
            className="flex w-[380px] max-h-[144px] gap-3 flex-row p-3 box-border rounded-3 shadow-primary cursor-pointer active:shadow-orange hover:shadow-active"
        >
            <div className="flex rounded-3 overflow-hidden min-w-[120px] h-[120px] justify-center items-center bg-base">
                {mealPicture ? <Image src={mealPicture} alt={mealPicture} /> : <PeopleEatIcon icon={Icon.food} edgeLength={52} />}
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-text-sm-bold text-preBlack">{mealTitle}</span>
                <span className="text-text-s text-preBlack">{mealDescription}</span>
            </div>
        </div>
    );
}
