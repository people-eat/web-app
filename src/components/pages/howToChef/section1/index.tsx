import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { type ReactElement } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import PEButton from '../../../standard/buttons/PEButton';
import VStack from '../../../utility/vStack/VStack';

export default function HowToChefSection1(): ReactElement {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('how-to-chef');

    return (
        <VStack className="w-full max-w-screen-xl lg_min:px-8 box-border">
            <VStack
                className="w-full md:w-screen mt-10 md:mt-0 rounded-4 md:rounded-[0px]"
                style={{
                    backgroundImage: 'url(/koch-münchen.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: isMobile ? 'calc(100vh - 80px)' : 502,
                }}
            >
                <VStack style={{ gap: 32 }}>
                    <div className="flex mt-[120px] md:mt-[65%] md:px-8 box-border text-heading-xxl max-w-[1040px] leading-[80px] w-full lg:justify-center">
                        <h2 className="w-full text-white text-center text-heading-xl md:text-heading-s m-0 p-0">{t('header')}</h2>
                    </div>
                    <Link href="chef-sign-up" className="no-underline mt-8" style={{ width: '100%', maxWidth: 400 }}>
                        <PEButton onClick={(): void => undefined} title={t('sign-up-button')} />
                    </Link>
                </VStack>
            </VStack>
        </VStack>
    );
}
