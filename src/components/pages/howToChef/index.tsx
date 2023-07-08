import { type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HowToChefSection6 from '../../pages/howToChef/section6';
import VStack from '../../utility/vStack/VStack';
import HowToChefSection1 from './section1';
import HowToChefSection2 from './section2';
import HowToChefSection3 from './section3';
import HowToChefSection4 from './section4';
import HowToChefSection5 from './section5';
import HowToChefSection7 from './section7';

export interface HowToChefPageProps {
    signedInUser?: SignedInUser;
}

export default function HowToChefPage({ signedInUser }: HowToChefPageProps): ReactElement {
    return (
        <VStack className="w-full">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full relative max-w-screen-xl px-8 md:px-4 box-border mb-10">
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
