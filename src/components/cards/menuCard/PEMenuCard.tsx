import Image from 'next/image';
import { type ReactElement } from 'react';
import PECarousel from '../../standard/carousel/PECarousel';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEMenuCardProps {
    onClick?: () => void;
    title?: string;
    chefName: string;
    chefPicture?: string;
    pricePerPerson?: number;
    description?: string;
    pictures?: string[];
    categories: string[];
    kitchens?: string[];
}

export default function PEMenuCard({
    onClick,
    title,
    chefName,
    chefPicture,
    pricePerPerson,
    description,
    pictures,
    categories,
    kitchens,
}: PEMenuCardProps): ReactElement {
    return (
        <div
            onClick={onClick}
            className="flex w-[580px] gap-3 flex-row p-3 box-border rounded-3 shadow-primary cursor-pointer active:shadow-orange hover:shadow-active"
        >
            <div className="flex rounded-3 overflow-hidden w-[220px] min-w-[220px] max-w-[220px] h-[220px] max-h-[220px] justify-center items-center bg-base">
                {pictures && pictures?.length > 1 ? (
                    <PECarousel
                        images={pictures?.map((picture) => (
                            <Image
                                key={picture}
                                style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                src={picture}
                                alt={picture}
                                width={220}
                                height={220}
                            />
                        ))}
                    />
                ) : pictures?.length ? (
                    <Image
                        key={pictures[0]}
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={pictures[0]}
                        alt={pictures[0]}
                        width={220}
                        height={220}
                    />
                ) : (
                    <PeopleEatIcon icon={Icon.food} edgeLength={52} />
                )}
            </div>
            <div className="flex gap-3 flex-col box-border w-full">
                <div className="flex flex-col gap-2 h-[148px] overflow-hidden">
                    <span className="text-text-sm-bold text-preBlack">{title}</span>
                    {pricePerPerson ? <span className="text-orange text-text-sm-bold">${pricePerPerson} for each person</span> : null}
                    <span className="text-text-s text-preBlack">{description}</span>
                </div>
                <div className={'overflow-x-scroll flex flex-row gap-2'}>
                    {categories.map(
                        (category): ReactElement => (
                            <div key={category} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                                {category}
                            </div>
                        ),
                    )}
                </div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row items-center gap-2 overflow-hidden">
                        {chefPicture ? (
                            <img src={chefPicture} alt={chefPicture} className="rounded-4 w-6 h-6 object-cover" />
                        ) : (
                            <PeopleEatIcon icon={Icon.profileLight} />
                        )}
                        <span className="text-preBlack">{chefName}</span>
                    </div>
                    {kitchens && Boolean(kitchens.length) && (
                        <div className={'items-center flex flex-row gap-2'}>
                            <PeopleEatIcon icon={Icon.dishes} />
                            <div className={'overflow-x-scroll items-center flex flex-row gap-2'}>
                                {kitchens.map(
                                    (kitchen): ReactElement => (
                                        <div key={kitchen} className={'text-orange text-text-s-height '}>
                                            {kitchen}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
