import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import PeopleEatButton from '../components/standard/PeopleEatButton';
import PeopleEatCheckbox from '../components/standard/checkbox/PeopleEatCheckbox';
import { Icon } from '../components/standard/icon/Icon';
import PeopleEatIcon from '../components/standard/icon/PeopleEatIcon';

const HomePage: NextPage = () => {
    const [isChecked, setIsChecked] = useState(true);

    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PeopleEatIcon icon={Icon.apple} edgeLength={50} />
                <PeopleEatIcon icon={Icon.close} />
                <div>
                    <PeopleEatCheckbox isChecked={isChecked} onCheckChange={setIsChecked} />
                    {isChecked ? 'checked' : 'unchecked'}
                </div>
                <h1>Welcome to PeopleEat</h1>
                <PeopleEatButton />
                <div>{process.env.NEXT_PUBLIC_SERVER_URL}</div>
            </main>
        </>
    );
};

export default HomePage;
