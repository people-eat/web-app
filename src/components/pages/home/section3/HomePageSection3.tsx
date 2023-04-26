import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEBulletPoint from '../../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../../standard/icon/Icon';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection3(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <div className="flex w-full min-h-[700px] lg:my-0 my-[64px] lg:flex-col">
            <VStack
                className="rounded-t-[50%] h-[602px] md:h-[502px] sm_min:max-h-[402px] minn:max-h-[302px] sm_min:min-w-full w-[50%] lg:w-full"
                style={{
                    backgroundImage: 'url(/friendsAtTheTable.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: 602,
                }}
            />
            <div className="flex ml-[100px] lg:m-0 lg:items-center flex-col">
                <h2 className="text-heading-xl lg:text-heading-s leading-[60px] lg:leading-[30px] lg:my-6 mb-12 lg:uppercase">
                    {t('section-3-header')}
                </h2>
                <div className="flex lg:mt-0 mt-10 lg:flex-col gap-6 flex-col justify-center lg:items-center">
                    <PEBulletPoint
                        icon={Icon.foodBasket}
                        title={'food'}
                        text={'Send your booking request and receive a response within 48 hours'}
                    />
                    <PEBulletPoint
                        icon={Icon.kitchen}
                        title={'food'}
                        text={'Send your booking request and receive a response within 48 hours'}
                    />
                    <PEBulletPoint
                        icon={Icon.chefTiming}
                        title={'food'}
                        text={'Send your booking request and receive a response within 48 hours'}
                    />
                </div>
            </div>
        </div>
    );
}
