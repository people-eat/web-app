import { type NextPage } from 'next';
import Head from 'next/head';
import PEButton from '../components/standard/button/PEButton';
import { Icon } from '../components/standard/icon/Icon';

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="flex flex-col p-10 box-border gap-5">
                    <PEButton type={'primary'} title={'Button'} onClick={() => ''} />
                    <PEButton type={'secondary'} title={'Button'} onClick={() => ''} />
                    <PEButton disabled={true} title={'Button'} onClick={() => ''} />
                    <PEButton type={'secondary'} disabled={true} title={'Button'} onClick={() => ''} />
                    <PEButton iconLeft={Icon.searchBar} type={'primary'} title={'Button'} onClick={() => ''} />
                    <PEButton iconRight={Icon.searchBar} type={'primary'} title={'Button'} onClick={() => ''} />
                    <PEButton size={'l'} iconRight={Icon.search} type={'primary'} title={'Button'} onClick={() => ''} />
                    <PEButton loading size={'l'} type={'primary'} title={'Button'} onClick={() => ''} />
                    <PEButton loading type={'secondary'} title={'Button'} onClick={() => ''} />
                    <PEButton iconLeft={Icon.searchBar} type={'primary'} title={''} onClick={() => ''} />
                </div>
            </main>
        </>
    );
};

export default HomePage;
