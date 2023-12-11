import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { type CookRank } from '../../../../data-source/generated/graphql';
import useResponsive from '../../../../hooks/useResponsive';
import PEButton from '../../../standard/buttons/PEButton';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export default function HowToChefSection3(): ReactElement {
    const { isMobile, isDesktop } = useResponsive();
    const { t: commonTranslation } = useTranslation('common');
    const { t } = useTranslation('how-to-chef');

    const chefRankDescriptions: { rank: CookRank; description: string }[] = [
        { rank: 'PROFESSIONAL', description: t('point-chef-description') },
        { rank: 'HOBBY', description: t('point-hobby-chef-description') },
    ];

    return (
        <VStack className="w-full max-w-screen-xl box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[160px] mb-15 md:my-10">
                    <h2 className="w-full text-center lg:text-black lg:text-center lg:text-heading-xm text-heading-xl m-0 p-0">
                        {t('section-3-title')}
                    </h2>
                </div>
                <HStack className="w-full relative lg:flex-wrap" style={{ justifyContent: !isDesktop ? 'center' : 'space-between' }}>
                    <VStack className="max-w-[510px] md:min-w-full gap-5 lg:mb-10">
                        {chefRankDescriptions.map(({ rank, description }, index) => (
                            <VStack
                                key={index}
                                style={{ alignItems: 'flex-start' }}
                                className="w-full py-6 px-4 box-border bg-base md:bg-white md:shadow-primary rounded-4 gap-2"
                            >
                                <p className="my-0 text-heading-m md:text-heading-ss text-orange">{commonTranslation(rank)}</p>
                                <p className="my-0 text-heading-ss md:text-text-sm">{description}</p>
                            </VStack>
                        ))}
                    </VStack>
                    <VStack className="max-w-[510px] md:min-w-full gap-5 md:mb-10"></VStack>
                    <VStack className="w-full max-w-[500px] gap-8" style={{ alignItems: 'flex-start' }}>
                        <p className="my-0 max-w-[500px] w-full md:text-text-sm">{t('promo-title')}</p>
                        <Link href="chef-sign-up" className="no-underline lg:mt-8 w-full">
                            <PEButton onClick={(): void => undefined} title={t('register-button')} />
                        </Link>
                        <Image
                            className="rounded-4"
                            style={{ width: isMobile ? '100%' : '500px', objectPosition: 'center', objectFit: 'cover' }}
                            src="/mietkoch-gericht.png"
                            alt={'how to chef page promo title'}
                            width={500}
                            height={200}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}
