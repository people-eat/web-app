import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { type ReactElement } from 'react';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { point1, point2, point3 } from '../../home/section4/howItWorks.mock';

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
                    <Image className="object-contain" src={'/chefs-pic.png'} alt={'chefs'} width={400} height={300} />
                    <HStack className="gap-4">
                        <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                            01
                        </span>
                        <span className="max-w-[240px]">{point1}</span>
                    </HStack>
                </VStack>
                <VStack>
                    <Image className="object-contain" src={'/dishes-section-04.png'} alt={'chefs'} width={400} height={300} />
                    <HStack className="gap-4">
                        <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                            02
                        </span>
                        <span className="max-w-[240px]">{point2}</span>
                    </HStack>
                </VStack>
                <VStack>
                    <Image className="object-cover" src={'/customers-pic.png'} alt={'chefs'} width={400} height={300} />
                    <HStack className="gap-4">
                        <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                            03
                        </span>
                        <span className="max-w-[240px]">{point3}</span>
                    </HStack>
                </VStack>
            </div>
            {/* <PEButton className="mt-12 max-w-[320px]" onClick={handleBookNow} title={'Sign in'} />*/}
        </VStack>
    );
}
