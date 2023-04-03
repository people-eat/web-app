import { type NextPage } from 'next';
import Head from 'next/head';
import PeopleEatButton from '~/components/standard/PeopleEatButton';
import PeopleEatNext from '~/components/standard/buttons/PeopleEatNext';
import { IconsList, PeopleEatIcon } from '~/components/standard/icon/PeopleEatIcon';

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PeopleEatIcon icon={IconsList.apple} />
                <PeopleEatIcon icon={IconsList.close} />
                <PeopleEatNext />
                <h1>Welcome to PeopleEat</h1>
                <PeopleEatButton />
                <div>{process.env.NEXT_PUBLIC_SERVER_URL}</div>
            </main>
        </>
    );
};

export default HomePage;
