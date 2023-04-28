import Image from 'next/image';
import { type ReactElement } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import ChefPromoCard from '../../../pages/howToChef/section4/ChefPromoCard';
import PEButton from '../../../standard/buttons/PEButton';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { section4Title, signUpBtn, step1, step1Title, step2, step2Title, step3, step3Title } from '../translations.mock';
import ChefRegistrationCard from './ChefRegistrationCard';

export default function HowToChefSection4(): ReactElement {
    const { isDesktop } = useResponsive();

    return (
        <VStack className="w-full max-w-screen-xl box-border">
            <VStack className="w-full relative gap-8 lg:mb-4 mt-[100px]">
                <div className="flex w-full lg:justify-center mt-[120px] lg:mt-0">
                    <h2 className="w-full text-center lg:text-black lg:text-center lg:text-heading-xm text-heading-xl m-0 p-0">
                        {section4Title}
                    </h2>
                </div>
                <VStack className="w-full relative h-[400px] lg:h-[1400px]">
                    <Image
                        className="absolute z-20 w-[calc(100%-530px)] lg:hidden top-[50%]"
                        style={{ objectPosition: 'center', objectFit: 'contain' }}
                        src={'/video-connection-icon.svg'}
                        alt={'video connection'}
                        width={660}
                        height={250}
                    />
                    {isDesktop && (
                        <VStack className="lg:h-[400px]">
                            <HStack className="ml-[-130px]">
                                <p className="absolute z-30 top-[65%] ml-[-20px] bg-base text-green py-2 px-4 rotate-10 rounded-6">
                                    PeopleEat Team
                                </p>
                                <HStack className="absolute z-20 top-[45%] overflow-hidden h-[120px] w-[120px] rounded-[60px]">
                                    <Image
                                        className="mt-[-20px]"
                                        style={{ objectPosition: 'center', objectFit: 'contain' }}
                                        src={'/team/Daniel.jpeg'}
                                        alt={'video connection'}
                                        width={140}
                                        height={178}
                                    />
                                </HStack>
                            </HStack>
                            <HStack className="mr-[-180px]">
                                <p className="absolute top-[49%] mr-[-35px] z-30 bg-base text-orange py-2 px-4 rotate-10 rounded-6">Chef</p>
                                <HStack className="absolute z-20 top-[60%] overflow-hidden h-[155px] w-[155px] rounded-[80px]">
                                    <Image
                                        className="mt-[-10px]"
                                        style={{ objectPosition: 'center', objectFit: 'contain' }}
                                        src={'/team/chris.png'}
                                        alt={'video connection'}
                                        width={175}
                                        height={175}
                                    />
                                </HStack>
                            </HStack>
                        </VStack>
                    )}
                    <div className="flex lg:flex-col w-full h-[500px] lg:h-[1400px] justify-between lg:justify-around items-center">
                        <VStack className="relative w-[275px] h-[290px] overflow-hidden bg-lightBlue rounded-4">
                            <div className="absolute bottom-[-45px] z-10 right-[-10px]">
                                <ChefRegistrationCard />
                            </div>
                        </VStack>
                        {!isDesktop && (
                            <VStack>
                                <p className="text-center w-[275px] text-heading-ss text-orange my-0">{step1}</p>
                                <p className="text-center w-[275px] my-0">{step1Title}</p>
                            </VStack>
                        )}
                        {!isDesktop && (
                            <VStack className="lg:h-[300px] relative bg-base w-[calc(110%)] max-w-[700px]">
                                <HStack className="ml-[-130px]">
                                    <p className="absolute z-30 top-[50%] ml-[-15px] bg-base text-green py-2 px-4 rotate-10 rounded-6">
                                        PeopleEat Team
                                    </p>
                                    <HStack className="absolute z-20 top-[25%] overflow-hidden h-[110px] w-[110px] rounded-[60px]">
                                        <Image
                                            className="mt-[-20px]"
                                            style={{ objectPosition: 'center', objectFit: 'contain' }}
                                            src={'/team/Daniel.jpeg'}
                                            alt={'video connection'}
                                            width={125}
                                            height={160}
                                        />
                                    </HStack>
                                </HStack>
                                <HStack className="mr-[-160px]">
                                    <p className="absolute top-[25%] mr-[-25px] z-30 bg-base text-orange py-2 px-4 rotate-10 rounded-6">
                                        Chef
                                    </p>
                                    <HStack className="absolute z-20 top-[35%] overflow-hidden h-[135px] w-[135px] rounded-[80px]">
                                        <Image
                                            className="mt-[-10px]"
                                            style={{ objectPosition: 'center', objectFit: 'contain' }}
                                            src={'/team/chris.png'}
                                            alt={'video connection'}
                                            width={160}
                                            height={160}
                                        />
                                    </HStack>
                                </HStack>
                            </VStack>
                        )}
                        {!isDesktop && (
                            <VStack>
                                <p className="text-center w-[340px] text-heading-ss text-orange my-0">{step2}</p>
                                <p className="text-center w-[340px] my-0">{step2Title}</p>
                            </VStack>
                        )}
                        <VStack className="relative w-[275px] h-[290px] overflow-hidden bg-lightBlue rounded-4">
                            <div className="absolute blur-sm left-8 bottom-[-10px] z-1 -rotate-10 origin-bottom">
                                <ChefPromoCard />
                            </div>
                            <div className="absolute blur-sm right-8 bottom-[-40px] z-4 rotate-10 origin-bottom">
                                <ChefPromoCard />
                            </div>
                            <div className="absolute bottom-[-60px] z-10">
                                <ChefPromoCard />
                            </div>
                        </VStack>
                        {!isDesktop && (
                            <VStack>
                                <p className="text-center w-[275px] text-heading-ss text-orange my-0">{step3}</p>
                                <p className="text-center w-[275px] my-0">{step3Title}</p>
                            </VStack>
                        )}
                    </div>
                </VStack>
                {isDesktop && (
                    <HStack className="w-full pt-15" style={{ justifyContent: 'space-between' }}>
                        <VStack>
                            <p className="text-center w-[275px] text-heading-ss text-orange my-0">{step1}</p>
                            <p className="text-center w-[275px] my-0">{step1Title}</p>
                        </VStack>
                        <VStack>
                            <p className="text-center w-[340px] text-heading-ss text-orange my-0">{step2}</p>
                            <p className="text-center w-[340px] my-2">{step2Title}</p>
                        </VStack>
                        <VStack>
                            <p className="text-center w-[275px] text-heading-ss text-orange my-0">{step3}</p>
                            <p className="text-center w-[275px] my-0">{step3Title}</p>
                        </VStack>
                    </HStack>
                )}
                <PEButton onClick={(): void => undefined} title={signUpBtn} className="max-w-[250px] lg:max-w-[400px] mt-10" />
            </VStack>
        </VStack>
    );
}
