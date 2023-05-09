import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import PEReviewCardPlatform from '../../../cards/reviewCard/PEReviewCardPlatform';
import PEReviewCardPlatformWeb from '../../../cards/reviewCard/PEReviewCardPlatformWeb';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { platformComment } from '../translations.mock';

export default function HowToChefSection6(): ReactElement {
    const { isDesktop } = useResponsive();
    const platform = isDesktop ? `${650 * 3}px` : `${400 * 3}px`;
    const { t } = useTranslation('how-to-chef');

    return (
        <VStack className="w-full max-w-screen-xl box-border mb-15 md:mb-0">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[120px] mb-15 md:mt-10 md:mb-0">
                    <h2 className="w-full text-center lg:text-black lg:text-center lg:text-heading-xm text-heading-xl m-0 p-0">
                        {t('section-6-title')}
                    </h2>
                </div>
                <VStack style={{ alignItems: 'flex-start', overflowX: 'scroll' }} className="w-full no-scrollbar">
                    <HStack style={{ width: platform }} className="flex-wrap gap-5 h-[300px] py-10 box-border no-scrollbar">
                        {isDesktop && (
                            <>
                                <PEReviewCardPlatformWeb
                                    location="Berlin"
                                    userProfilePictureUrl={'/team/dirk.png'}
                                    userFirstName="Sam"
                                    ratingValue="4.9"
                                    occasion="Master Chef"
                                    comment={platformComment}
                                />
                                <PEReviewCardPlatformWeb
                                    location="Berlin"
                                    userProfilePictureUrl={'/team/dirk.png'}
                                    userFirstName="Sam"
                                    ratingValue="4.9"
                                    occasion="Master Chef"
                                    comment={platformComment}
                                />
                                <PEReviewCardPlatformWeb
                                    location="Berlin"
                                    userProfilePictureUrl={'/team/dirk.png'}
                                    userFirstName="Sam"
                                    ratingValue="4.9"
                                    occasion="Master Chef"
                                    comment={platformComment}
                                />
                            </>
                        )}
                        {!isDesktop && (
                            <>
                                <PEReviewCardPlatform
                                    location="Berlin"
                                    userProfilePictureUrl={'/team/dirk.png'}
                                    userFirstName="Sam"
                                    ratingValue="4.9"
                                    occasion="Master Chef"
                                    comment={platformComment}
                                />
                                <PEReviewCardPlatform
                                    location="Berlin"
                                    userProfilePictureUrl={'/team/dirk.png'}
                                    userFirstName="Sam"
                                    ratingValue="4.9"
                                    occasion="Master Chef"
                                    comment={platformComment}
                                />
                                <PEReviewCardPlatform
                                    location="Berlin"
                                    userProfilePictureUrl={'/team/dirk.png'}
                                    userFirstName="Sam"
                                    ratingValue="4.9"
                                    occasion="Master Chef"
                                    comment={platformComment}
                                />
                            </>
                        )}
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
}
