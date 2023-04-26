import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEReviewCardChef from '../../../cards/reviewCard/PEReviewCardChef';
import VStack from '../../../utility/vStack/VStack';
import { mockPublicReviews } from './review.mock';

export default function HomePageSection9(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <VStack className="w-full h-auto mt-15">
            <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">{t('ratings-section-header')}</h2>
            <div className="relative h-[350px] flex w-full flex-wrap gap-5 mt-10 justify-center sm:flex-col items-center">
                {mockPublicReviews.map((item) => (
                    <PEReviewCardChef
                        key={`${item.chefName}_PEReviewCardPlatform`}
                        customerFirstName={item.customerName}
                        chefFirstName={item.chefName}
                        chefRank={item.rank}
                        ratingValue={item.rating}
                        comment={item.comment}
                        createdAt={item.created}
                    />
                ))}
            </div>
        </VStack>
    );
}
