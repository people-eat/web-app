import { type NextPage } from 'next';
import Head from 'next/head';
import PeopleEatCheckbox from '../components/standard/checkbox/PeopleEatCheckbox';
import PeopleEatCounter from '../components/standard/counter/PeopleEatCounter';
import PeopleEatFavorite from '../components/standard/favorite/PeopleEatFavorite';
import { Icon } from '../components/standard/icon/Icon';
import PeopleEatIcon from '../components/standard/icon/PeopleEatIcon';

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
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
