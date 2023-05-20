import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEReviewCardChef from '../../../cards/reviewCard/PEReviewCardChef';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection9(): ReactElement {
    const { t: cards } = useTranslation('common');

    return (
        <VStack className="w-full h-auto">
            <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">Recent reviews</h2>
            <div className="relative h-[350px] flex w-full flex-wrap gap-5 mt-10 justify-center sm:flex-col items-center">
                {['-01', '-02', '-03'].map((item) => (
                    <PEReviewCardChef
                        key={`${cards(`chef${item}`)}_PEReviewCardPlatform`}
                        customerFirstName={cards(`name${item}`)}
                        chefFirstName={cards(`chef${item}`)}
                        chefRank={cards(`rank${item}`)}
                        ratingValue={cards(`rating${item}`)}
                        comment={cards(`comment${item}`)}
                        createdAt={cards(`created${item}`)}
                    />
                ))}
            </div>
        </VStack>
    );
}
