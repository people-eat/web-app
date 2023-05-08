import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function AboutUsPage(): ReactElement {
    const { t } = useTranslation('about-us');
    const { isMobile } = useResponsive();

    return (
        <VStack className="w-full" style={{ gap: 80 }}>
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack className="w-full max-w-screen-xl" style={{ gap: 64, alignItems: 'flex-start' }}>
                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('headline')}</h1>
                </VStack>
                <HStack style={{ gap: 32, flexWrap: 'wrap' }}>
                    <VStack style={{ gap: 32 }}>
                        <Image
                            src="/team/founders.png"
                            width="640"
                            height="400"
                            alt=""
                            style={{ borderRadius: 16, objectFit: 'cover' }}
                            className="shadow-xl"
                        />
                        <HStack className="w-full">
                            <Link href={'https://www.linkedin.com/in/daniel-merkel2810'}>LinkedIn</Link>
                            <Spacer />
                            <Link href={'https://www.linkedin.com/in/natalia-tyagunova-219121a3/'}>LinkedIn</Link>
                        </HStack>
                    </VStack>
                    <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: '500px' }}>
                        <h1 className="text-heading-xl m-0 p-0">{t('section-1-header')}</h1>
                        <p>{t('section-1-p-1')}</p>
                        <p>{t('section-1-p-2')}</p>
                        <p>{t('section-1-p-3')}</p>
                    </VStack>
                </HStack>

                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl m-0 p-0">{t('section-2-header')}</h1>
                    <p>{t('section-2-p-1')}</p>
                    <HStack className="w-full" style={{ gap: 32, flexWrap: 'wrap' }}>
                        <Image
                            src="/team/dirk.png"
                            width="340"
                            height="300"
                            alt=""
                            style={{ margin: 'auto', borderRadius: 16, objectFit: 'cover' }}
                            className="shadow-xl"
                        />
                        <Image
                            src="/team/chris.png"
                            width="340"
                            height="300"
                            alt=""
                            style={{ margin: 'auto', borderRadius: 16, objectFit: 'cover' }}
                            className="shadow-xl"
                        />
                        <Image
                            src="/team/cem.png"
                            width="340"
                            height="300"
                            alt=""
                            style={{ margin: 'auto', borderRadius: 16, objectFit: 'cover' }}
                            className="shadow-xl"
                        />
                    </HStack>
                </VStack>

                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl m-0 p-0">{t('section-3-header')}</h1>
                    <p>{t('section-3-p-1')}</p>
                </VStack>

                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl m-0 p-0">{t('section-4-header')}</h1>
                </VStack>
            </VStack>

            <PEFooter />
        </VStack>
    );
}
