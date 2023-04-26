import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

const EVENTS = ['Family party', 'Customer meeting', 'Team-Event', 'Dinner', 'Candle Light dinner', 'Home party with friends', 'Lunch'];

export default function HomePageSection2(): ReactElement {
    const { t } = useTranslation('home');

    function handleBookNow(): void {
        return;
    }

    return (
        <div className="flex w-full min-h-[700px] lg:my-10 my-[64px] justify-between items-center lg:flex-col-reverse">
            <div className="flex items-start lg:items-center flex-col">
                <h2 className="text-heading-xl lg:text-heading-s lg:text-center leading-[60px] mb-12 lg:uppercase">
                    {t('section-2-header')}
                </h2>
                <HStack className="lg:gap-2 gap-4 max-w-[580px] flex-wrap" style={{ justifyContent: 'flex-start' }}>
                    {EVENTS.map((event) => (
                        <span
                            key={`${event}_PE`}
                            className="shadow-primary lg:text-text-s lg:py-2 lg:px-4 px-5 py-3 rounded-8 hover:cursor-default"
                        >
                            {event}
                        </span>
                    ))}
                </HStack>
                <PEButton className="mt-12 max-w-[320px]" onClick={handleBookNow} title={'Book now'} />
            </div>
            <VStack
                className="rounded-t-[50%] h-[602px] md:h-[502px] sm_min:max-h-[402px] minn:max-h-[302px] sm_min:min-w-full w-[50%] lg:w-full"
                style={{
                    backgroundImage: 'url(/friendsAtTheTable.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: 602,
                }}
            />
        </div>
    );
}
