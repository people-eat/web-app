import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { type GetPublicMenuPageDataQuery } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import { formatPrice } from '../../../shared-domain/formatPrice';
import PECarousel from '../../standard/carousel/PECarousel';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface PublicMenuSummaryHeaderProps {
    className?: string;
    publicMenu: NonNullable<GetPublicMenuPageDataQuery['publicMenus']['findOne']>;
    adults: number;
    childrenCount: number;
    calculatedMenuPrice: number;
}

export default function PublicMenuSummaryHeader({
    className,
    publicMenu,
    adults,
    childrenCount,
    calculatedMenuPrice,
}: PublicMenuSummaryHeaderProps): ReactElement {
    const { isMobile } = useResponsive();

    return (
        <HStack
            className={classNames(className, 'w-full bg-white shadow-primary box-border p-8 rounded-4')}
            gap={16}
            style={{ flexDirection: isMobile ? 'column' : 'row' }}
        >
            <div className="flex justify-center items-center rounded-3  overflow-hidden w-[220px] min-w-[220px] max-w-[220px] h-[220px] max-h-[220px] bg-base">
                {publicMenu.imageUrls.length < 1 && <PEIcon icon={Icon.food} edgeLength={52} />}

                {publicMenu.imageUrls.length === 1 && (
                    <Image
                        unoptimized
                        draggable={false}
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={publicMenu.imageUrls[0] as string}
                        alt={'Menu image'}
                        width={220}
                        height={220}
                    />
                )}

                {publicMenu.imageUrls.length > 1 && !isMobile && (
                    <PECarousel
                        images={publicMenu.imageUrls.map((picture, index) => (
                            <Image
                                unoptimized
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

                {publicMenu.imageUrls.length > 1 && isMobile && (
                    <Image
                        unoptimized
                        draggable={false}
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={publicMenu.imageUrls[0] as string}
                        alt={'Menu image'}
                        width={220}
                        height={220}
                    />
                )}
            </div>

            {publicMenu.imageUrls.length > 1 && isMobile && (
                <div className="flex overflow-x-auto  gap-3 mt-2" style={{ overflow: 'scroll' }}>
                    {publicMenu.imageUrls.slice(1).map((imageUrl, index) => (
                        <div key={index} className="flex-none rounded-3 w-28">
                            <Image
                                unoptimized
                                draggable={false}
                                style={{ width: '100%', objectPosition: 'center', objectFit: 'fill', borderRadius: '12px' }}
                                src={imageUrl}
                                alt={'Menu image'}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            )}

            <VStack gap={16} style={{ alignItems: 'flex-start' }}>
                <VStack gap={0} style={{ alignItems: 'flex-start' }} className="h-full">
                    <p style={{ textAlign: 'start', padding: 0, margin: 0 }} className="text-heading-m">
                        {publicMenu.title}
                    </p>
                    <p style={{ lineHeight: 0, textAlign: 'start' }} className="text-orange">
                        {formatPrice({ amount: calculatedMenuPrice / (adults + childrenCount), currencyCode: 'EUR' })} pro Person
                    </p>
                    <p style={{ lineHeight: 0 }} className="text-gray">
                        (Bei einer Anzahl von {adults + childrenCount} Personen)
                    </p>

                    <Spacer />

                    <HStack gap={8} className="w-full">
                        {publicMenu.cook.user.profilePictureUrl && (
                            <Image
                                unoptimized
                                width={48}
                                height={48}
                                src={publicMenu.cook.user.profilePictureUrl}
                                alt={'Profile picture of the chef owning the menu'}
                                className="object-cover"
                                style={{ borderRadius: '50%' }}
                            />
                        )}

                        {!publicMenu.cook.user.profilePictureUrl && <PEIcon edgeLength={54} icon={Icon.profileLight} />}

                        <VStack style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <span className="text-preBlack">{publicMenu.cook.user.firstName}</span>
                            <HStack gap={4}>
                                <PEIcon icon={Icon.markerPin} />
                                <span className="text-preBlack">{publicMenu.cook.city}</span>
                            </HStack>
                        </VStack>

                        <Spacer />
                    </HStack>

                    {publicMenu.description && (
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <p style={{ lineHeight: 0 }} className="text-gray">
                                Menübeschreibung
                            </p>
                            <span>{publicMenu.description}</span>
                        </VStack>
                    )}
                </VStack>

                {publicMenu.categories.map((category) => (
                    <div key={category.categoryId}>{category.title}</div>
                ))}

                <HStack>
                    {publicMenu.kitchen && (
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <p style={{ lineHeight: 0 }} className="text-gray">
                                Küche
                            </p>
                            <HStack gap={4}>
                                {Boolean(publicMenu.kitchen) && <PEIcon icon={Icon.dishes} />}
                                <span className="text-orange">{publicMenu.kitchen.title}</span>
                            </HStack>
                        </VStack>
                    )}
                </HStack>

                {/* {publicMenu.cook.languages?.length > 0 && (
                    <HStack gap={16}>
                        <PEIcon icon={Icon.messageChat} />
                        <span>{publicMenu.cook.languages.map(({ title }) => title).join(', ')}</span>
                    </HStack>
                )} */}
            </VStack>

            <Spacer />
        </HStack>
    );
}
