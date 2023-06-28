import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import PECarousel from '../../standard/carousel/PECarousel';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import { type PEMenuCardProps } from './PEMenuCardProps';

export default function PEMenuCard({
    title,
    description,
    imageUrls,
    pricePerPerson,
    currencyCode,
    chefFirstName,
    chefProfilePictureUrl,
    categories,
    kitchen,
    onClick,
    fullWidth,
}: PEMenuCardProps): ReactElement {
    return (
        <div
            draggable
            onClick={onClick}
            className={classNames(
                'flex flex-row gap-3 big:w-[45%] overflow-hidden items-center p-3 box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active bg-white',
                {
                    ['min-w-[625px] w-[calc(50%-16px)]']: fullWidth,
                    ['w-[580px]']: !fullWidth,
                },
            )}
        >
            <div className="flex justify-center items-center rounded-3 overflow-hidden w-[220px] min-w-[220px] max-w-[220px] h-[220px] max-h-[220px] bg-base">
                {imageUrls.length < 1 && <PEIcon icon={Icon.food} edgeLength={52} />}

                {imageUrls.length === 1 && (
                    <Image
                        draggable={false}
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={imageUrls[0] as string}
                        alt={'Menu image'}
                        width={220}
                        height={220}
                    />
                )}

                {imageUrls.length > 1 && (
                    <PECarousel
                        images={imageUrls.map((picture, index) => (
                            <Image
                                draggable={false}
                                key={index}
                                style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                src={picture}
                                alt={`Menu image ${index + 1}`}
                                width={220}
                                height={220}
                            />
                        ))}
                    />
                )}
            </div>

            <VStack gap={8} className="w-full max-w-[325px] box-border" style={{ alignItems: 'flex-start' }}>
                <VStack gap={8} className="h-[148px] overflow-hidden" style={{ alignItems: 'flex-start' }}>
                    <span className="text-text-sm-bold text-preBlack">{title}</span>
                    <span className="text-orange text-text-sm-bold">
                        ab {pricePerPerson / 100} {currencyCode} pro Person
                    </span>
                    <span className="w-full text-text-s text-preBlack line-clamp-6">{description}</span>
                </VStack>

                <HStack gap={8} className="w-full max-w-full" style={{ justifyContent: 'flex-start', overflowX: 'scroll' }}>
                    {categories.map(
                        (category, index): ReactElement => (
                            <span key={index} className="rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base break-keep">
                                {category}
                            </span>
                        ),
                    )}
                </HStack>

                <HStack gap={8} className="w-full">
                    {chefProfilePictureUrl && (
                        <Image
                            width={24}
                            height={24}
                            src={chefProfilePictureUrl}
                            alt={'Profile picture of the chef owning the menu'}
                            className="rounded-4 w-6 h-6 object-cover"
                        />
                    )}

                    {!chefProfilePictureUrl && <PEIcon icon={Icon.profileLight} />}

                    <span className="text-preBlack">{chefFirstName}</span>

                    <Spacer />

                    {kitchen && (
                        <span className="items-center flex flex-row gap-2">
                            {Boolean(kitchen) && <PEIcon icon={Icon.dishes} />}
                            <span className="text-orange text-text-s-height">{kitchen}</span>
                        </span>
                    )}
                </HStack>
            </VStack>
        </div>
    );
}
