import classNames from 'classnames';
import { type ReactElement } from 'react';
import PEReviewCardPlatformWeb from '../../../cards/reviewCard/PEReviewCardPlatformWeb';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { platformComment, section6Title } from '../translations.mock';

export default function HowToChefSection6(): ReactElement {
    const platform = `${650 * 3}px`;
    return (
        <VStack className="w-full max-w-screen-xl lg:px-8 box-border mb-15">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[120px] mb-15">
                    <h2 className="w-full text-center lg:text-black lg:text-center w-full lg:text-heading-xm text-heading-xl m-0 p-0 lg:uppercase">
                        {section6Title}
                    </h2>
                </div>
                <VStack style={{ alignItems: 'flex-start', overflowX: 'scroll' }} className="w-full">
                    <HStack style={{ width: platform }} className={classNames('flex-wrap gap-5')}>
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
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
}
