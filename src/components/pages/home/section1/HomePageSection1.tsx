import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEBulletPoint from '../../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../../standard/icon/Icon';

export default function HomePageSection1(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <div className="flex w-full lg:mt-8 mt-10 lg:flex-col gap-6 flex-row justify-around lg:items-center">
            <PEBulletPoint icon={Icon.createOrder} text={t('section-1-bullet-point-1-description')} maxWidth={'300px'} width={'300px'} />
            <PEBulletPoint icon={Icon.support24} text={t('section-1-bullet-point-2-description')} maxWidth={'300px'} width={'300px'} />
            <PEBulletPoint
                icon={Icon.communicationWithChef}
                text={t('section-1-bullet-point-3-description')}
                maxWidth={'300px'}
                width={'300px'}
            />
        </div>
    );
}
