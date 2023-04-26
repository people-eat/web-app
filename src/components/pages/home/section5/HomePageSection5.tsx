import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection5(): ReactElement {
    const { t } = useTranslation('home');

    t;

    return (
        <VStack className="w-full pt-[140px] lg:py-4 pb-15 rounded-4 gap-4">
            <h2 className="text-heading-xl lg:text-heading-s my-0 lg:uppercase">Individual preferences</h2>
            <p className="my-0 text-center">
                Sed tempus urn. Consecrate disciplining elite <br />
                interpellates habitat morbid critique select et.
            </p>
            <VStack
                className="w-full h-[300px] big:h-[220px] lg_min:h-[160px] md_min:h-[110px] minn:h-[80px]"
                style={{
                    backgroundImage: 'url(/dishes_02.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            />
        </VStack>
    );
}
