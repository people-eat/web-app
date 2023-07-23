import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection10(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <VStack className="w-full my-[140px] sm:my-[40px]">
            <p className="text-heading-m lg:text-rem-heading-xm lg:uppercase">{t('support-section-header')}</p>
            <VStack
                className="w-full max-w-[900px] h-[181px] sm:h-[150px]"
                style={{
                    width: '100%',
                    backgroundImage: 'url(/frankfurt-school.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            />
        </VStack>
    );
}
