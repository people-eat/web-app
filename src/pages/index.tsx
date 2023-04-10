import { type NextPage } from 'next';
import Head from 'next/head';
import PeopleEatChoice from '~/components/standard/choice/PeopleEatChoice';
import PeopleEatCheckbox from '../components/standard/checkbox/PeopleEatCheckbox';
import PeopleEatCounter from '../components/standard/counter/PeopleEatCounter';
import PeopleEatFavorite from '../components/standard/favorite/PeopleEatFavorite';
import PeopleEatHideButton from '../components/standard/hideButton/PeopleEatHideButton';
import { Icon } from '../components/standard/icon/Icon';
import PeopleEatIcon from '../components/standard/icon/PeopleEatIcon';
import PeopleEatNextButton from '../components/standard/nextButton/PeopleEatNextButton';
import PeopleEatTabItem from '../components/standard/tabItem/PeopleEatTabItem';
import PeopleEatDocumentDownloadButton
    from "~/components/standard/documentDownloadButton/PeopleEatDocumentDownloadButton";
import PeopleEatCreditCard from "~/components/standard/creditCard/PeopleEaCreditCard";
import PeopleEatInput from "~/components/standard/input/PeopleEatInput";

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="max-w-[401px] flex flex-col gap-4">
                <PeopleEatHideButton />
                <PeopleEatTabItem title={'Europäisch'} />
                <PeopleEatChoice onClose={(): void => console.log('click')} title={'Europäisch '} />
                <PeopleEatNextButton />
                <PeopleEatFavorite />
                <PeopleEatInput />
                <PeopleEatInput pass />
                <PeopleEatInput disabled />
                <PeopleEatInput email />
                <PeopleEatCounter />
                <PeopleEatCheckbox />
                <PeopleEatDocumentDownloadButton title={'überprüfen.pdf'} downloadSize={'245 Mb'} />
                <PeopleEatDocumentDownloadButton title={'überprüfen.pdf'} downloadSize={'245 Mb'} disabled />
                <PeopleEatCreditCard label={'MasterCard'} number={'132 * 12'} />
                <PeopleEatIcon icon={Icon.apple} edgeLength={50} />
                <PeopleEatIcon icon={Icon.close} />
                <h1>Welcome to PeopleEat</h1>
                <div>{process.env.NEXT_PUBLIC_SERVER_URL}</div>
            </main>
        </>
    );
};

export default HomePage;
