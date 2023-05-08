import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import VStack from '../../utility/vStack/VStack';

export interface DataPrivacyPolicyPageProps {
    privacyPolicyUpdateId: string;
    englishText: string;
    germanText: string;
    createdAt: Date;
}

export default function DataPrivacyPolicyPage({ englishText, germanText }: DataPrivacyPolicyPageProps): ReactElement {
    const { t } = useTranslation('common');
    const { locale } = useRouter();
    const { isMobile } = useResponsive();

    return (
        <VStack className="w-full" style={{ gap: 80 }}>
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack className="w-full max-w-screen-xl" style={{ gap: 64, alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('data-privacy-policy')}</h1>
                <div dangerouslySetInnerHTML={{ __html: locale === 'en' ? englishText : germanText }}></div>
            </VStack>

            <PEFooter />
        </VStack>
    );
}
