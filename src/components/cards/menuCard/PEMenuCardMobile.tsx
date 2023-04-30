import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEMealCardProps {
    onClick?: () => void;
    title?: string;
    chefName: string;
    pricePerPerson?: number;
    description?: string;
    picture?: string;
    chefPicture?: string;
    categories?: string[];
    kitchens?: string[];
}

export default function PEMenuCardMobile({
    onClick,
    title,
    chefName,
    pricePerPerson,
    description,
    picture,
    chefPicture,
    categories,
    kitchens,
}: PEMealCardProps): ReactElement {
    return (
        <div
            onClick={onClick}
            className="flex w-[343px] gap-3 flex-col p-3 box-border rounded-3 shadow-primary cursor-pointer active:shadow-orange hover:shadow-active"
        >
            <div className="flex gap-3 flex-row box-border">
                <div className="flex rounded-3 overflow-hidden min-w-[120px] h-[120px] justify-center items-center bg-base">
                    {picture ? (
                        <img src={picture} alt={picture} className="w-[120px] h-[120px] object-cover" />
                    ) : (
                        <PeopleEatIcon icon={Icon.food} edgeLength={52} />
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-text-sm-bold text-preBlack">{title}</span>
                    {pricePerPerson ? <span className="text-orange text-text-sm-bold">${pricePerPerson} for each person</span> : null}
                    <span className="text-text-s text-preBlack">{description}</span>
                </div>
            </div>
            <div className={'overflow-x-scroll flex flex-row gap-2 scrollbar-hide'}>
                {categories?.map(
                    (category): ReactElement => (
                        <div key={category} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                            {category}
                        </div>
                    ),
                )}
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2 overflow-hidden">
                    {chefPicture ? (
                        <img src={chefPicture} alt={chefPicture} className="rounded-4 w-6 h-6 object-cover" />
                    ) : (
                        <PeopleEatIcon icon={Icon.profileLight} />
                    )}
                    <span className="text-preBlack">{chefName}</span>
                </div>
                <div className={'items-center flex flex-row gap-2'}>
                    <PeopleEatIcon icon={Icon.dishes} />
                    <div className={'overflow-x-scroll items-center flex flex-row gap-2'}>
                        {kitchens?.map(
                            (menu): ReactElement => (
                                <div key={menu} className={'text-orange text-text-s-height '}>
                                    {menu}
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
