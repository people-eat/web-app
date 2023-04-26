import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEReviewCardChef from '../../../cards/reviewCard/PEReviewCardChef';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection9(): ReactElement {
    const { t } = useTranslation('home');

    t;

    return (
        <VStack className="w-full">
            <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">Recent reviews</h2>
            <div className="flex w-full flex-wrap gap-5 mt-10 justify-center sm:flex-col items-center">
                {[1, 2].map((item) => (
                    <PEReviewCardChef
                        key={`${item}_PEReviewCardPlatform`}
                        customerFirstName={'Lolita, Mun-hen'}
                        chefFirstName={'Maxim'}
                        chefRank={'MASTER'}
                        ratingValue={'4.9'}
                        comment={'"This is the first time we have booked a chef for a dinner with our friends at home. The booking was...'}
                        createdAt={'June, 14 2023 '}
                    />
                ))}
            </div>
        </VStack>
    );
}
