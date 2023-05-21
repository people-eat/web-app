import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import VStack from '../../../utility/vStack/VStack';
import { section05Header, section05SubHeader } from '../index.mock';

export default function HomePageSection5(): ReactElement {
    const { t } = useTranslation('home');

    t;

    return (
        <VStack className="w-full pt-[140px] lg:py-4 pb-15 rounded-4 gap-4">
            <h2 className="text-heading-xl lg:text-heading-s  max-w-[530px] text-center my-0 lg:uppercase">{section05Header}</h2>
            <p className="my-0 text-center max-w-[525px]">{section05SubHeader}</p>
            <VStack
                className="w-full h-[300px] big:h-[220px] lg_min:h-[160px] md_min:h-[110px] minn:h-[80px]"
                style={{
                    backgroundImage: 'url(/dishes-section.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            />
        </VStack>
    );
}
