import { type ReactElement } from 'react';
import PEBulletPoint from '../../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../../standard/icon/Icon';
import { header, point1, point1Description, point2, point2Description, point3, point3Description } from './bullets.mock';

export default function HomePageSection3(): ReactElement {
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
                <h2 className="text-heading-xl lg:text-heading-s leading-[60px] lg:leading-[30px] lg:my-6 mb-12 lg:uppercase">{header}</h2>
                <div className="flex lg:mt-0 mt-10 lg:flex-col gap-6 flex-col justify-center lg:items-center">
                    <PEBulletPoint icon={Icon.foodBasket} title={point1} text={point1Description} maxWidth={'530px'} />
                    <PEBulletPoint icon={Icon.dinner} title={point2} text={point2Description} maxWidth={'530px'} />
                    <PEBulletPoint icon={Icon.cleanKitchen} title={point3} text={point3Description} maxWidth={'530px'} />
                </div>
            </div>
        </div>
    );
}
