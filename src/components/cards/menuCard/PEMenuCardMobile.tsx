import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import { type PEMenuCardProps } from './PEMenuCardProps';

export default function PEMenuCardMobile({
    title,
    description,
    imageUrls,
    pricePerPerson,
    chefFirstName,
    chefProfilePictureUrl,
    categories,
    kitchen,
    onClick,
}: PEMenuCardProps): ReactElement {
    return (
        <div
            onClick={onClick}
            className="flex w-[343px] gap-3 flex-col p-3 box-border rounded-3 shadow-primary cursor-pointer active:shadow-orange hover:shadow-active"
        >
            <div className="flex gap-3 flex-row box-border">
                <div className="flex rounded-3 overflow-hidden min-w-[120px] h-[120px] justify-center items-center bg-base">
                    {imageUrls.length ? (
                        <img src={imageUrls[0]} alt={imageUrls[0]} className="w-[120px] h-[120px] object-cover" />
                    ) : (
                        <PEIcon icon={Icon.food} edgeLength={52} />
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-text-sm-bold text-preBlack">{title}</span>
                    {pricePerPerson ? <span className="text-orange text-text-sm-bold">${pricePerPerson} for each person</span> : null}
                    <span className="text-text-s text-preBlack line-clamp-4">{description}</span>
                </div>
            </div>
            <div className={'no-scrollbar overflow-x-scroll flex flex-row gap-2 scrollbar-hide'} style={{ overflowY: 'initial' }}>
                {categories?.map(
                    (category, index): ReactElement => (
                        <div key={`${category}__${index}`} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                            {category}
                        </div>
                    ),
                )}
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2 overflow-hidden">
                    {chefProfilePictureUrl && (
                        <img src={chefProfilePictureUrl} alt={chefProfilePictureUrl} className="rounded-4 w-6 h-6 object-cover" />
                    )}
                    {!chefProfilePictureUrl && <PEIcon icon={Icon.profileLight} />}
                    <span className="text-preBlack">{chefFirstName}</span>
                </div>
                <div className={'items-center flex flex-row gap-2'}>
                    {Boolean(kitchen) && <PEIcon icon={Icon.dishes} />}
                    <div className={'no-scrollbar overflow-x-scroll items-center flex flex-row gap-2'} style={{ overflowY: 'initial' }}>
                        {kitchen && <div className={'text-orange text-text-s-height '}>{kitchen}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
