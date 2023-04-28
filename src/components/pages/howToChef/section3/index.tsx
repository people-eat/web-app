import Image from 'next/image';
import { type ReactElement } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import PEButton from '../../../standard/buttons/PEButton';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { ChefDescription, HobbyChefDescription, masterChefDescription, promoTitle, register, section3Title } from '../translations.mock';

export default function HowToChefSection3(): ReactElement {
    const { isMobile, isDesktop } = useResponsive();

    return (
        <VStack className="w-full max-w-screen-xl box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[160px] mb-15 md:my-10">
                    <h2 className="w-full text-center lg:text-black lg:text-center lg:text-heading-xm text-heading-xl m-0 p-0">
                        {section3Title}
                    </h2>
                </div>
                <HStack className="w-full relative lg:flex-wrap" style={{ justifyContent: !isDesktop ? 'center' : 'space-between' }}>
                    <VStack className="max-w-[510px] md:min-w-full gap-5 lg:mb-10">
                        <VStack
                            style={{ alignItems: 'flex-start' }}
                            className="w-full py-6 px-4 box-border bg-base md:bg-white md:shadow-primary rounded-4 gap-2"
                        >
                            <p className="my-0 text-heading-m md:text-heading-ss text-orange">Master Chef</p>
                            <p className="my-0 text-heading-ss md:text-text-sm">{masterChefDescription}</p>
                        </VStack>
                        <VStack
                            style={{ alignItems: 'flex-start' }}
                            className="w-full py-6 px-4 box-border bg-base md:bg-white md:shadow-primary rounded-4 gap-2"
                        >
                            <p className="my-0 text-heading-m md:text-heading-ss text-orange">Professional chef</p>
                            <p className="my-0 text-heading-ss md:text-text-sm">{ChefDescription}</p>
                        </VStack>
                        <VStack
                            style={{ alignItems: 'flex-start' }}
                            className="w-full py-6 px-4 box-border bg-base md:bg-white md:shadow-primary rounded-4 gap-2"
                        >
                            <p className="my-0 text-heading-m md:text-heading-ss text-orange">Hobby chef</p>
                            <p className="my-0 text-heading-ss md:text-text-sm">{HobbyChefDescription}</p>
                        </VStack>
                    </VStack>
                    <VStack className="w-full max-w-[500px] gap-8" style={{ alignItems: 'flex-start' }}>
                        <p className="my-0 max-w-[500px] w-full md:text-text-sm">{promoTitle}</p>
                        <PEButton className="w-[250px]" onClick={(): void => undefined} title={register} />
                        <Image
                            className="rounded-4"
                            style={{ width: isMobile ? '100%' : '500px', objectPosition: 'center', objectFit: 'cover' }}
                            src={'/how-to-chef.png'}
                            alt={'how to chef page promo title'}
                            width={500}
                            height={200}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}
