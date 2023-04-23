import { type NextPage } from 'next';
import Head from 'next/head';
import PeopleEatAddress from '~/components/standard/adress/PeopleEatAddress';
import PeopleEatChatComponentPreview from '../components/standard/chatComponent/PeopleEatChatComponentPreview';
import PeopleEatCheckbox from '../components/standard/checkbox/PeopleEatCheckbox';
import PeopleEatChoice from '../components/standard/choice/PeopleEatChoice';
import PeopleEatCounter from '../components/standard/counter/PeopleEatCounter';
import PeopleEatCreditCard from '../components/standard/creditCard/PeopleEatCreditCard';
import PeopleEatDownloadButton from '../components/standard/downloadButton/PeopleEatDownloadButton';
import PeopleEatFavorite from '../components/standard/favorite/PeopleEatFavorite';
import PeopleEatHideButton from '../components/standard/hideButton/PeopleEatHideButton';
import { Icon } from '../components/standard/icon/Icon';
import PeopleEatIcon from '../components/standard/icon/PeopleEatIcon';
import PeopleEatInput from '../components/standard/input/PeopleEatInput';
import PeopleEatNextButton from '../components/standard/nextButton/PeopleEatNextButton';
import PeopleEatSearch, { PeopleEatSearchResult } from '../components/standard/search/PeopleEatSearch';
import PeopleEatSlider from '../components/standard/slider/PeopleEatSlider';
import PeopleEatTabItem from '../components/standard/tabItem/PeopleEatTabItem';

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="max-w-[401px] flex flex-col gap-4">
                <PeopleEatChatComponentPreview
                    label={'In Germany'}
                    menuTitle={'delicious dinner'}
                    date={'1. Jan 2023'}
                    time={'18:00'}
                    userName={'Oleg Melchenko'}
                    lastDateActive={'2d'}
                    place={'vierstrasse street'}
                    onClick={(): void => undefined}
                />
                <PeopleEatSlider onProgress={(): void => undefined} />
                <PeopleEatSearch onSearchClick={({ city, persons, children, date }: PeopleEatSearchResult): void => undefined} />
                <PeopleEatAddress city={'Haus'} address={'Your adress'} />
                <PeopleEatAddress city={'Haus'} street={'Weerstrasse 125 23'} address={'Your adress'} />
                <PeopleEatHideButton />
                <PeopleEatTabItem title={'European'} />
                <PeopleEatChoice onClose={(): void => undefined} title={'European '} />
                <PeopleEatNextButton />
                <PeopleEatInput />
                <PeopleEatInput password />
                <PeopleEatInput disabled />
                <PeopleEatInput email />
                <PeopleEatCreditCard number={'*1913'} label={'MasterCard'} />
                <PeopleEatDownloadButton downloadSize={'245 Mb'} title={'European'} onClick={(): void => undefined} />
                <PeopleEatFavorite />
                <PeopleEatCounter />
                <PeopleEatCheckbox />
                <PeopleEatIcon icon={Icon.apple} edgeLength={50} />
                <PeopleEatIcon icon={Icon.close} />
                <div>{process.env.NEXT_PUBLIC_SERVER_URL}</div>
            </main>
        </>
    );
};

export default HomePage;
