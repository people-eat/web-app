import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEMealCardProps {
    onClick?: () => void;
    mealTitle?: string;
    pricePerPerson?: number;
    mealDescription?: string;
    mealPicture?: string;
    categories?: string[];
    menus?: string[];
}

export default function PEMealCard({
    onClick,
    mealTitle,
    pricePerPerson,
    mealDescription,
    mealPicture,
    categories,
    menus,
}: PEMealCardProps): ReactElement {
    return (
        <div
            onClick={onClick}
            className="flex w-[380px] gap-3 flex-col p-3 box-border rounded-3 shadow-primary cursor-pointer active:shadow-orange hover:shadow-active"
        >
            <div className="flex gap-3 flex-row box-border">
                <div className="flex rounded-3 overflow-hidden min-w-[120px] h-[120px] justify-center items-center bg-base">
                    {mealPicture ? <Image src={mealPicture} alt={mealPicture} /> : <PeopleEatIcon icon={Icon.food} edgeLength={52} />}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-text-sm-bold text-preBlack">{mealTitle}</span>
                    {pricePerPerson ? <span className="text-orange text-text-sm-bold">${pricePerPerson} for each person</span> : null}
                    <span className="text-text-s text-preBlack">{mealDescription}</span>
                </div>
            </div>
            <div className={'overflow-scroll flex flex-row gap-2 scrollbar-hide'}>
                {categories?.map(
                    (category): ReactElement => (
                        <div key={category} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                            {category}
                        </div>
                    ),
                )}
            </div>
            <div className={'overflow-x-scroll items-center flex flex-row gap-2 scrollbar-hide'}>
                <PeopleEatIcon icon={Icon.dishes} />
                {menus?.map(
                    (menu): ReactElement => (
                        <div key={menu} className={'text-orange text-text-s-height '}>
                            {menu}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
