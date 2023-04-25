import { type NextPage } from 'next';
import Head from 'next/head';
import PEChefCard from '../components/cards/chefCard/PEChefCard';

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="flex flex-row flex-wrap p-10 box-border gap-5">
                    <PEChefCard
                        kitchensList={['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo']}
                        chefName={'Maximilian'}
                        image={'/chef.png'}
                        city={'Berlin'}
                        estimation={'4.9'}
                        voices={'25'}
                    />
                    <PEChefCard
                        kitchensList={['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo']}
                        chefName={'Maximilian'}
                        image={'/chef.png'}
                        estimation={'4.9'}
                        voices={'25'}
                    />
                    <PEChefCard
                        kitchensList={['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo']}
                        chefName={'Maximilian'}
                        city={'Berlin'}
                        estimation={'4.9'}
                        voices={'25'}
                    />
                </div>
                <div className="flex flex-row flex-wrap p-10 box-border gap-5">
                    <PEChefCard
                        kitchensList={['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo']}
                        chefName={'Maximilian'}
                        city={'Berlin'}
                        image={'/chef.png'}
                        size={'s'}
                        estimation={'4.9'}
                        voices={'25'}
                        dishesList={['European', 'Australia', 'Midland']}
                    />
                    <PEChefCard
                        kitchensList={['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo']}
                        chefName={'Maximilian'}
                        city={'Berlin'}
                        size={'s'}
                        estimation={'4.9'}
                        voices={'25'}
                        dishesList={['European', 'Australia', 'Midland']}
                    />
                </div>
            </main>
        </>
    );
};

export default HomePage;
