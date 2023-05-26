import Image from 'next/image';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { ChefDescription, HobbyChefDescription, masterChefDescription, promoTitle, register, section3Title } from '../translations.mock';

export default function HowToChefSection3(): ReactElement {
    return (
        <VStack className="w-full max-w-screen-xl lg:px-8 box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[160px] mb-15">
                    <h2 className="w-full text-center lg:text-black lg:text-center w-full lg:text-heading-xm text-heading-xl m-0 p-0 lg:uppercase">
                        {section3Title}
                    </h2>
                </div>
                <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                    <VStack className="min-w-[510px] gap-5">
                        <VStack style={{ alignItems: 'flex-start' }} className="w-full py-6 px-4 bg-base rounded-4 gap-2">
                            <p className="my-0 text-heading-m text-orange">Master Chef</p>
                            <p className="my-0 text-heading-ss">{masterChefDescription}</p>
                        </VStack>
                        <VStack style={{ alignItems: 'flex-start' }} className="w-full py-6 px-4 bg-base rounded-4 gap-2">
                            <p className="my-0 text-heading-m text-orange">Master Chef</p>
                            <p className="my-0 text-heading-ss">{ChefDescription}</p>
                        </VStack>
                        <VStack style={{ alignItems: 'flex-start' }} className="w-full py-6 px-4 bg-base rounded-4 gap-2">
                            <p className="my-0 text-heading-m text-orange">Master Chef</p>
                            <p className="my-0 text-heading-ss">{HobbyChefDescription}</p>
                        </VStack>
                    </VStack>
                    <VStack className="gap-8" style={{ alignItems: 'flex-start' }}>
                        <p className="my-0 max-w-[500px]">{promoTitle}</p>
                        <PEButton className="w-[250px]" onClick={(): void => undefined} title={register} />
                        <Image
                            className="rounded-4"
                            style={{ width: '500px', objectPosition: 'center', objectFit: 'cover' }}
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
