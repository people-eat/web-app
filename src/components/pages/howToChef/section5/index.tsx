import { type ReactElement } from 'react';
import FeatureCard from '../../../pages/howToChef/section5/FeatureCard';
import { Icon } from '../../../standard/icon/Icon';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { feature01, feature02, feature03, feature04, feature05, feature06, section5Title } from '../translations.mock';

export default function HowToChefSection5(): ReactElement {
    return (
        <VStack className="w-full max-w-screen-xl lg:px-8 box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[120px] mb-15">
                    <h2 className="w-full text-center lg:text-black lg:text-center w-full lg:text-heading-xm text-heading-xl m-0 p-0 lg:uppercase">
                        {section5Title}
                    </h2>
                </div>
                <HStack className="w-full flex-wrap gap-5">
                    <FeatureCard title={feature01} featureIcon={Icon.feature01} />
                    <FeatureCard title={feature02} featureIcon={Icon.feature02} />
                    <FeatureCard title={feature03} featureIcon={Icon.feature03} />
                    <FeatureCard title={feature04} featureIcon={Icon.feature04} />
                    <FeatureCard title={feature05} featureIcon={Icon.feature05} />
                    <FeatureCard title={feature06} featureIcon={Icon.feature06} />
                </HStack>
            </VStack>
        </VStack>
    );
}
