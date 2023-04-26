import { type ReactElement } from 'react';
import PEHeader from '../../header/PEHeader';
import PEBulletPoint from '../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../standard/icon/Icon';
import PESearch from '../../standard/search/PESearch';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';

export default function HomePage(): ReactElement {
    return (
        <VStack className="w-full">
            <PEHeader />
            <VStack className="w-full max-w-screen-lg" style={{ margin: '32px', alignItems: 'flex-start', gap: 32 }}>
                <VStack
                    className="w-full"
                    style={{
                        backgroundImage: 'url(/glass.png)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: 502,
                        borderRadius: '16px',
                    }}
                >
                    <VStack style={{ alignItems: 'flex-start', gap: 0 }}>
                        <h1 className="text-white">Find a private chef for</h1>
                        <h1 className="text-white">every occasion at your home</h1>
                    </VStack>
                    <p className="text-white">Culinary experiences await you here</p>
                    <PESearch onSearchClick={(): void => undefined} />
                </VStack>
                <HStack className="w-full" style={{ justifyContent: 'space-evenly' }}>
                    <PEBulletPoint icon={Icon.dishes} text={'Configure your menu in 2 minutes'} />
                    <PEBulletPoint icon={Icon.usersOrange} text={'Get 24 / 7 support'} />
                    <PEBulletPoint icon={Icon.chatDots} text={'Communicate directly with your chef'} />
                </HStack>
            </VStack>
        </VStack>
    );
}
