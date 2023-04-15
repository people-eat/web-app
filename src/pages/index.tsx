import { type NextPage } from 'next';
import Head from 'next/head';
import PeopleEatSearch from '~/components/standard/search/PeopleEatSearch';
import PeopleEatCameraButton from '../components/standard/changePhotoButton/PeopleEatCameraButton';
import PeopleEatCheckbox from '../components/standard/checkbox/PeopleEatCheckbox';
import PeopleEatChoice from '../components/standard/choice/PeopleEatChoice';
import PeopleEatCounter from '../components/standard/counter/PeopleEatCounter';
import PeopleEatCreditCard from '../components/standard/creditCard/PeopleEatCreditCard';
import PeopleEatDocumentDownloadButton from '../components/standard/documentDownloadButton/PeopleEatDocumentDownloadButton';
import PeopleEatEditButton from '../components/standard/editButton/PeopleEatEditButton';
import PeopleEatFavorite from '../components/standard/favorite/PeopleEatFavorite';
import PeopleEatHideButton from '../components/standard/hideButton/PeopleEatHideButton';
import { Icon } from '../components/standard/icon/Icon';
import PeopleEatIcon from '../components/standard/icon/PeopleEatIcon';
import PeopleEatInput from '../components/standard/input/PeopleEatInput';
import PeopleEatNextButton from '../components/standard/nextButton/PeopleEatNextButton';
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
                <PeopleEatSearch />
                <PeopleEatHideButton
                    onClick={(): void => {
                        'click';
                    }}
                />
                <PeopleEatTabItem title={'European'} />
                <PeopleEatChoice
                    onClose={(): void => {
                        'click';
                    }}
                    title={'European '}
                />
                <PeopleEatCameraButton
                    onClick={(): void => {
                        'click';
                    }}
                />
                <PeopleEatEditButton
                    onClick={(): void => {
                        'click';
                    }}
                />
                <PeopleEatNextButton />
                <PeopleEatInput />
                <PeopleEatInput pass />
                <PeopleEatInput disabled />
                <PeopleEatInput email />
                <PeopleEatCreditCard number={'*1913'} label={'MasterCard'} />
                <PeopleEatDocumentDownloadButton
                    downloadSize={'245 Mb'}
                    title={'European'}
                    onClick={(): void => {
                        'click';
                    }}
                />
                <PeopleEatFavorite />
                <PeopleEatCounter />
                <PeopleEatCheckbox />
                <PeopleEatIcon icon={Icon.apple} edgeLength={50} />
                <PeopleEatIcon icon={Icon.close} />
                <h1>Welcome to PeopleEat</h1>
                <div>{process.env.NEXT_PUBLIC_SERVER_URL}</div>
            </main>
        </>
    );
};

export default HomePage;
