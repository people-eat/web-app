import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { type ReactElement } from 'react';
import PEBulletPoint from '../../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../../standard/icon/Icon';

export default function HomePageSection3(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <div className="flex w-full min-h-[700px] lg:my-0 my-[64px] lg:flex-col">
            <Image
                draggable={false}
                src={'/koch-mieten-für-zuhause.gif'}
                className="object-cover object-[0 -40px] rounded-t-[50%] h-[602px] md:h-[502px] sm_min:max-h-[402px] minn:max-h-[302px] sm_min:min-w-full w-[50%] lg:w-full shadow-xl"
                alt="Koch der mit frischen Zutaten bei einem Kunden zu einem Event ankommt"
                width={400}
                height={800}
            />

            <div className="flex lg:w-full w-[50%] ml-[100px] lg:m-0 lg:items-center flex-col">
                <h2 className="text-heading-xl lg:text-heading-s leading-[60px] lg:leading-[30px] lg:my-6 mb-12 lg:uppercase">
                    {t('section-3-header')}
                </h2>
                <div className="flex lg:mt-0 mt-10 lg:flex-col gap-6 flex-col justify-center lg:items-center">
                    <PEBulletPoint
                        icon={Icon.foodBasket}
                        title={t('section-3-bullet-point-1-title')}
                        text={t('section-3-bullet-point-1-description')}
                        maxWidth={'530px'}
                    />
                    <PEBulletPoint
                        icon={Icon.dinner}
                        title={t('section-3-bullet-point-2-title')}
                        text={t('section-3-bullet-point-2-description')}
                        maxWidth={'530px'}
                    />
                    <PEBulletPoint
                        icon={Icon.cleanKitchen}
                        title={t('section-3-bullet-point-3-title')}
                        text={t('section-3-bullet-point-3-description')}
                        maxWidth={'530px'}
                    />
                </div>
            </div>
        </div>
    );
}
