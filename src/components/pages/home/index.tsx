import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEHeader from '../../header/PEHeader';
import PEBulletPoint from '../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../standard/icon/Icon';
import PESearch from '../../standard/search/PESearch';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';

export default function HomePage(): ReactElement {
    const { t } = useTranslation('home');
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
                        <h1 className="text-white">{t('headline')}</h1>
                    </VStack>
                    <p className="text-white">{t('sub-headline')}</p>
                    <PESearch onSearchClick={(): void => undefined} />
                </VStack>
                <HStack className="w-full" style={{ justifyContent: 'space-evenly' }}>
                    <PEBulletPoint icon={Icon.dishes} text={t('section-1-selling-point-1')} />
                    <PEBulletPoint icon={Icon.usersOrange} text={t('section-1-selling-point-2')} />
                    <PEBulletPoint icon={Icon.chatDots} text={t('section-1-selling-point-3')} />
                </HStack>
            </VStack>
        </VStack>
    );
}
