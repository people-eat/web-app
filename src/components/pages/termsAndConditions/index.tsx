import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import VStack from '../../utility/vStack/VStack';

export default function TermsAndConditionsPage(): ReactElement {
    const { t } = useTranslation('common');
    const { isMobile } = useResponsive();

    return (
        <VStack className="w-full" style={{ gap: 80 }}>
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack className="w-full max-w-screen-xl" style={{ gap: 64, alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('terms-and-conditions')}</h1>
            </VStack>

            <PEFooter />
        </VStack>
    );
}
