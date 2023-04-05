import { type NextPage } from 'next';
import Head from 'next/head';
import PeopleEatCheckbox from '~/components/standard/buttons/PeopleEatCheckbox';
import PeopleEatFavorite from '~/components/standard/buttons/PeopleEatFavorite';
import PeopleEatShowPassword from '~/components/standard/buttons/PeopleEatShowPass';
import PeopleEatButton from '../components/standard/PeopleEatButton';
import { Icon } from '../components/standard/icon/Icon';
import PeopleEatIcon from '../components/standard/icon/PeopleEatIcon';
import PeopleEatCounter from "~/components/standard/counter";

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PeopleEatCheckbox />
                <PeopleEatShowPassword />
                <PeopleEatFavorite />
                <PeopleEatCounter />
                <PeopleEatIcon icon={Icon.apple} edgeLength={50} />
                <PeopleEatIcon icon={Icon.close} />
                <h1>Welcome to PeopleEat</h1>
                <PeopleEatButton />
                <div>{process.env.NEXT_PUBLIC_SERVER_URL}</div>
            </main>
        </>
    );
};

export default HomePage;
