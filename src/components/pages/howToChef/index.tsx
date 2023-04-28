import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import HowToChefSection6 from '../../pages/howToChef/section6';
import VStack from '../../utility/vStack/VStack';
import HowToChefSection1 from './section1';
import HowToChefSection2 from './section2';
import HowToChefSection3 from './section3';
import HowToChefSection4 from './section4';
import HowToChefSection5 from './section5';
import HowToChefSection7 from './section7';

export default function HowToChefPage(): ReactElement {
    const { isMobile } = useResponsive();

    return (
        <VStack className="w-full">
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack className="w-full max-w-screen-xl px-8 box-border mb-10">
                <HowToChefSection1 />
                <HowToChefSection2 />
                <HowToChefSection3 />
                <HowToChefSection4 />
                <HowToChefSection5 />
                <HowToChefSection6 />
                <HowToChefSection7 />
                {/* <HowToChefSection8 /> */}
            </VStack>
            <PEFooter />
        </VStack>
    );
}
