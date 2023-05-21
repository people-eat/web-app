import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEBulletPoint from '../../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../../standard/icon/Icon';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection3(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <div className="flex w-full min-h-[700px] lg:my-0 my-[64px] lg:flex-col">
            <img
                className="object-cover object-[0 -40px] rounded-t-[50%] h-[602px] md:h-[502px] sm_min:max-h-[402px] minn:max-h-[302px] sm_min:min-w-full w-[50%] lg:w-full"
                src={'/peopleEatPreview.gif'}
                alt={'people eat gif preview'}
                style={{
                    height: 602,
                }}
            />
            <div className="flex lg:w-full w-[50%] ml-[100px] lg:m-0 lg:items-center flex-col">
                <h2 className="text-heading-xl lg:text-heading-s leading-[60px] lg:leading-[30px] lg:my-6 mb-12 lg:uppercase">
                    {t('section-3-header')}
                </h2>
                <div className="flex lg:mt-0 mt-10 lg:flex-col gap-6 flex-col justify-center lg:items-center">
                    <PEBulletPoint
                        icon={Icon.foodBasket}
                        title={t('section-3-selling-point-1')}
                        text={t('section-3-selling-point-description-1')}
                        maxWidth={'530px'}
                    />
                    <PEBulletPoint
                        icon={Icon.dinner}
                        title={t('section-3-selling-point-2')}
                        text={t('section-3-selling-point-description-2')}
                        maxWidth={'530px'}
                    />
                    <PEBulletPoint
                        icon={Icon.cleanKitchen}
                        title={t('section-3-selling-point-3')}
                        text={t('section-3-selling-point-description-3')}
                        maxWidth={'530px'}
                    />
                </div>
            </div>
        </div>
    );
}
