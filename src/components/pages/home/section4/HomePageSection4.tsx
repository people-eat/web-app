import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { type ReactElement } from 'react';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection4(): ReactElement {
    const { t } = useTranslation('home');

    // function handleBookNow(): void {
    //     return;
    // }

    return (
        <VStack className="w-full bg-yellowLight gap-8 lg:py-6 py-15 rounded-4">
            <h2 className="text-heading-xl lg:text-heading-s lg:mb-0 lg:leading-[34px] leading-[60px] mb-12 lg:uppercase">
                {t('section-4-header')}
            </h2>
            <div className="flex w-full gap-12 lg:flex-col flex-row justify-center">
                <VStack>
                    <Image className="object-contain" src="/koch-für-zuhause.png" alt="Privatkoch" width={400} height={300} />
                    <HStack className="gap-4">
                        <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                            01
                        </span>
                        <span className="max-w-[240px]">{t('section-4-bullet-point-1-description')}</span>
                    </HStack>
                </VStack>
                <VStack>
                    <Image className="object-contain" src="/privatkoch-gerichte.png" alt="Dinner Gerichte" width={400} height={300} />
                    <HStack className="gap-4">
                        <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                            02
                        </span>
                        <span className="max-w-[240px]">{t('section-4-bullet-point-2-description')}</span>
                    </HStack>
                </VStack>
                <VStack>
                    <Image
                        className="object-cover"
                        src="/treffen-freunde-zuhause.png"
                        alt="Dinner Party zuhause"
                        width={400}
                        height={300}
                    />
                    <HStack className="gap-4">
                        <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                            03
                        </span>
                        <span className="max-w-[240px]">{t('section-4-bullet-point-3-description')}</span>
                    </HStack>
                </VStack>
            </div>
            {/* <PEButton className="mt-12 max-w-[320px]" onClick={handleBookNow} title={'Sign in'} />*/}
        </VStack>
    );
}
