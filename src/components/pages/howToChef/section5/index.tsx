import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import FeatureCard from '../../../pages/howToChef/section5/FeatureCard';
import { Icon } from '../../../standard/icon/Icon';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export default function HowToChefSection5(): ReactElement {
    const { t } = useTranslation('how-to-chef');

    return (
        <VStack className="w-full max-w-screen-xl box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[120px] md:mt-15 mb-15 md:mb-0">
                    <h2 className="w-full text-center lg:text-black lg:text-center lg:text-heading-xm text-heading-xl m-0 p-0 lg:uppercase">
                        {t('section-5-title')}
                    </h2>
                </div>
                <HStack className="w-screen max-w-full relative flex-wrap gap-5">
                    <FeatureCard title={t('feature01')} featureIcon={Icon.feature01} />
                    <FeatureCard title={t('feature02')} featureIcon={Icon.feature02} />
                    <FeatureCard title={t('feature03')} featureIcon={Icon.feature03} />
                    <FeatureCard title={t('feature04')} featureIcon={Icon.feature04} />
                    <FeatureCard title={t('feature05')} featureIcon={Icon.feature05} />
                    <FeatureCard title={t('feature06')} featureIcon={Icon.feature06} />
                </HStack>
            </VStack>
        </VStack>
    );
}
