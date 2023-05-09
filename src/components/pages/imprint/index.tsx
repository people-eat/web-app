import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import VStack from '../../utility/vStack/VStack';

export default function ImprintPage(): ReactElement {
    const { t } = useTranslation('imprint');
    const { isMobile } = useResponsive();

    return (
        <VStack className="w-full min-h-screen gap-16">
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack className="w-full max-w-screen-xl gap-4 lg:px-4 box-border" style={{ alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('imprint')}</h1>
                <p className="leading-16">
                    {t('point-1')}
                    <br />
                    <br />
                    {t('point-2')}
                    <br />
                    <br />
                    {t('point-3')}
                    <br />
                    <br />
                    {t('point-4')}
                    <br />
                    <br />
                    {t('point-5')}
                    <br />
                    <br />
                    {t('point-6')}
                </p>
            </VStack>

            <PEFooter />
        </VStack>
    );
}
