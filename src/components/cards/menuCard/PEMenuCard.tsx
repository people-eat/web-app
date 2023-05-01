import Image from 'next/image';
import { type ReactElement } from 'react';
import PECarousel from '../../standard/carousel/PECarousel';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import { type PEMenuCardProps } from './PEMenuCardProps';

export default function PEMenuCard({
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
            className="relative flex w-[580px] big:w-[45%] overflow-hidden items-center gap-3 flex-row p-3 box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active"
        >
            <div className="flex rounded-3 overflow-hidden w-[220px] min-w-[220px] max-w-[220px] h-[220px] max-h-[220px] justify-center items-center bg-base">
                {imageUrls.length < 1 && <PEIcon icon={Icon.food} edgeLength={52} />}
                {imageUrls.length === 1 && (
                    <Image
                        key={imageUrls[0]}
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={imageUrls[0] as string}
                        alt={imageUrls[0] as string}
                        width={220}
                        height={220}
                    />
                )}
                {imageUrls.length > 1 && (
                    <PECarousel
                        images={imageUrls.map((picture, index) => (
                            <Image
                                key={`${picture}__${index}`}
                                style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                src={picture}
                                alt={picture}
                                width={220}
                                height={220}
                            />
                        ))}
                    />
                )}
            </div>
            <div className="max-w-[325px] relative flex gap-3 flex-col box-border">
                <div className="flex flex-col gap-2 h-[148px] overflow-hidden">
                    <span className="text-text-sm-bold text-preBlack">{title}</span>
                    <span className="text-orange text-text-sm-bold">ab {pricePerPerson}€ pro Person</span>
                    <span className="w-full text-text-s text-preBlack line-clamp-6">{description}</span>
                </div>
                <div className={'max-w-full overflow-auto flex flex-row gap-2'} style={{ overflowY: 'initial' }}>
                    {categories.map(
                        (category, index): ReactElement => (
                            <div
                                key={`${category}__${index}`}
                                className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}
                            >
                                {category}
                            </div>
                        ),
                    )}
                </div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row items-center gap-2 overflow-hidden">
                        {chefProfilePictureUrl && (
                            <Image
                                width={24}
                                height={24}
                                src={chefProfilePictureUrl}
                                alt={chefProfilePictureUrl}
                                className="rounded-4 w-6 h-6 object-cover"
                            />
                        )}
                        {!chefProfilePictureUrl && <PEIcon icon={Icon.profileLight} />}
                        <span className="text-preBlack">{chefFirstName}</span>
                    </div>
                    {kitchen && (
                        <div className={'items-center flex flex-row gap-2'}>
                            {Boolean(kitchen) && <PEIcon icon={Icon.dishes} />}
                            <div
                                className={'no-scrollbar overflow-x-scroll items-center flex flex-row gap-2'}
                                style={{ overflowY: 'initial' }}
                            >
                                <div className={'text-orange text-text-s-height '}>{kitchen}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
