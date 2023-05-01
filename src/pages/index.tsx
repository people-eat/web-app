import { type NextPage } from 'next';
import Head from 'next/head';
import HomePage from '../components/pages/home';
import PEChefCardMobile from "~/components/cards/chefCard/PEChefCardMobile";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex gap-4 p-4 flex-wrap">
                <PEChefCardMobile
                    rank={'Home'}
                    name={'Maximilian'}
                    location={'Berlin'}
                    categories={['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek']}
                    kitchens={['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek']}
                    rating={{ count: 25, average: 4.9 }}
                />
                <PEChefCardMobile
                    rank={'Home'}
                    name={'Maximilian'}
                    location={'Berlin'}
                    categories={[]}
                    kitchens={['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek']}
                    rating={{ count: 25, average: 11 }}
                />
                <PEChefCardMobile
                    rank={'Home'}
                    name={'Maximilian'}
                    location={'Berlin'}
                    categories={['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek']}
                    kitchens={[]}
                    rating={{ count: 25, average: 11 }}
                />
                <PEChefCardMobile
                    rank={'Home'}
                    name={'Maximilian'}
                    location={'Berlin'}
                    categories={[]}
                    kitchens={[]}
                    rating={{ count: 25, average: 11 }}
                />
            </div>
        </>
    );
};

export default Index;
