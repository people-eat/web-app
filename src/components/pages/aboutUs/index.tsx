import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface AboutUsPageProps {
    signedInUser?: SignedInUser;
}

export default function AboutUsPage({ signedInUser }: AboutUsPageProps): ReactElement {
    const { t } = useTranslation('about-us');
    const { isDesktop } = useResponsive();

    return (
        <VStack className="w-full p-4 box-border" style={{ gap: 80 }}>
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full max-w-screen-xl lg:p-4 box-border" style={{ gap: 64, alignItems: 'flex-start' }}>
                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl lg:text-heading-s lg:uppercase lg:text-center m-0 p-0 max-w-screen-lg">
                        {t('headline')}
                    </h1>
                </VStack>
                <HStack style={{ gap: 32, flexWrap: 'wrap' }}>
                    <VStack className="lg:w-full" style={{ gap: 32 }}>
                        <VStack
                            className="h-[440px] w-[640px] lg:w-full lg:h-[220px] box-border"
                            style={{
                                backgroundImage: 'url(/team/founders.png)',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                            }}
                        />
                        <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'initial' }}>
                            <Link className="no-underline" href={'https://www.linkedin.com/in/daniel-merkel2810'}>
                                <HStack>
                                    <VStack className="w-[54px] h-[54px] bg-base rounded-2 justify-center">
                                        <VStack
                                            className="h-8 w-8"
                                            style={{
                                                backgroundImage: 'url(/linkedIn.svg)',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                            }}
                                        />
                                    </VStack>
                                    <p className="pl-4 text-black">Daniel, Co-Founder</p>
                                </HStack>
                            </Link>
                            <Spacer />
                            <Link className="no-underline" href={'https://www.linkedin.com/in/natalia-tyagunova-219121a3'}>
                                <HStack>
                                    <VStack className="w-[54px] h-[54px] bg-base rounded-2 justify-center">
                                        <VStack
                                            className="h-8 w-8"
                                            style={{
                                                backgroundImage: 'url(/linkedIn.svg)',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                            }}
                                        />
                                    </VStack>
                                    <p className="pl-4 text-black">Natalia, Co-Founder</p>
                                </HStack>
                            </Link>
                        </HStack>
                    </VStack>
                    <VStack className="min-w-[500px] lg:min-w-full" style={{ alignItems: 'flex-start', flex: 1 }}>
                        <h1 className="text-heading-xl lg:text-heading-ss m-0 p-0">{t('section-1-header')}</h1>
                        <p className="lg:text-text-sm leading-8 ">{t('section-1-p-1')}</p>
                        <p className="leading-8 lg:text-text-sm">{t('section-1-p-2')}</p>
                        <p className="leading-8 lg:text-text-sm">{t('section-1-p-3')}</p>
                    </VStack>
                </HStack>

                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl lg:text-heading-ss m-0 p-0">{t('section-2-header')}</h1>
                    <p className="leading-8 lg:text-text-sm">{t('section-2-p-1')}</p>
                    <HStack className="w-full lg:my-6 my-12 lg:flex-wrap gap-8 lg:gap-4" style={{ justifyContent: 'flex-start' }}>
                        {isDesktop ? (
                            <>
                                <VStack
                                    className="relative w-full h-[360px] shadow-xl rounded-4 p-5 box-border"
                                    style={{
                                        backgroundImage: 'url(/team/dirk.png)',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <VStack
                                        className="absolute z-10 cursor-default"
                                        style={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}
                                    >
                                        <p className="text-white text-heading-ss my-0">Dirk</p>
                                        <p className="text-white my-0 text-left">{t('chef-title')}</p>
                                        <p className="text-orange my-0 text-left">{t('chef-experience')}</p>
                                    </VStack>
                                    <div className="absolute bottom-0 bg-blackGradient h-[100px] w-[calc(100%)] left-0 rounded-b-4" />
                                </VStack>
                                <VStack
                                    className="relative w-full h-[360px] shadow-xl rounded-4 p-5 box-border"
                                    style={{
                                        backgroundImage: 'url(/team/chris.png)',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <VStack
                                        className="absolute z-10 cursor-default"
                                        style={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}
                                    >
                                        <p className="text-white text-heading-ss my-0">Christopher</p>
                                        <p className="text-white my-0 text-left">{t('chef-title')}</p>
                                        <p className="text-orange my-0 text-left">{t('chef-experience')}</p>
                                    </VStack>
                                    <div className="absolute bottom-0 bg-blackGradient h-[100px] w-[calc(100%)] left-0 rounded-b-4" />
                                </VStack>
                                <VStack
                                    className="relative w-full h-[360px] shadow-xl rounded-4 p-5 box-border"
                                    style={{
                                        backgroundImage: 'url(/team/cem.png)',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <VStack
                                        className="absolute z-10 cursor-default"
                                        style={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}
                                    >
                                        <p className="text-white text-heading-ss my-0">Cem</p>
                                        <p className="text-white my-0 text-left">{t('developer-title')}</p>
                                        <p className="text-orange my-0 text-left">{t('developer-experience')}</p>
                                    </VStack>
                                    <div className="absolute bottom-0 bg-blackGradient h-[100px] w-[calc(100%)] left-0 rounded-b-4" />
                                </VStack>
                            </>
                        ) : (
                            <>
                                <VStack className="w-[calc(50%-8px)]" style={{ alignItems: 'flex-start' }}>
                                    <VStack
                                        className="relative w-full lg_min:h-[300px] md:h-[167px] shadow-xl rounded-4 p-5 box-border"
                                        style={{
                                            backgroundImage: 'url(/team/dirk.png)',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-start',
                                        }}
                                    />
                                    <p className="text-text-m-bold my-2">Dirk</p>
                                    <p className="my-0 text-left text-preBlack">{t('chef-title')}</p>
                                    <p className="text-orange my-0 text-left">{t('chef-experience')}</p>
                                </VStack>
                                <VStack className="w-[calc(50%-8px)]" style={{ alignItems: 'flex-start' }}>
                                    <VStack
                                        className="relative w-full lg_min:h-[300px] md:h-[167px] shadow-xl rounded-4 p-5 box-border"
                                        style={{
                                            backgroundImage: 'url(/team/chris.png)',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-start',
                                        }}
                                    />
                                    <p className="text-text-m-bold my-2">Christopher</p>
                                    <p className="my-0 text-left text-preBlack">{t('chef-title')}</p>
                                    <p className="text-orange my-0 text-left">{t('chef-experience')}</p>
                                </VStack>
                                <VStack className="w-[calc(50%-8px)]" style={{ alignItems: 'flex-start' }}>
                                    <VStack
                                        className="relative w-full lg_min:h-[300px] md:h-[167px] shadow-xl rounded-4 p-5 box-border"
                                        style={{
                                            backgroundImage: 'url(/team/cem.png)',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-start',
                                        }}
                                    />
                                    <p className="text-text-m-bold my-2">Cem</p>
                                    <p className="my-0 text-left text-preBlack">{t('developer-title')}</p>
                                    <p className="text-orange my-0 text-left">{t('developer-experience')}</p>
                                </VStack>
                            </>
                        )}
                    </HStack>
                </VStack>

                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl lg:text-heading-ss m-0 p-0">{t('section-3-header')}</h1>
                    <p className="leading-8 lg:text-text-sm">{t('section-3-p-1')}</p>
                </VStack>

                <VStack style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-heading-xl lg:text-heading-ss m-0 p-0">{t('section-4-header')}</h1>
                </VStack>
            </VStack>

            <PEFooter />
        </VStack>
    );
}
