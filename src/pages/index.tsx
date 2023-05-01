import { type NextPage } from 'next';
import Head from 'next/head';
import HomePage from '../components/pages/home';
import PEReviewCardChef from "~/components/cards/reviewCard/PEReviewCardChef";
import PEReviewCardMenu from "~/components/cards/reviewCard/PEReviewCardMenu";
import PEReviewCardPlatform from "~/components/cards/reviewCard/PEReviewCardPlatform";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*<HomePage />*/}
            <div className="flex gap-4 p-8 flex-wrap">
                <PEReviewCardChef
                    chefName={'Maximilian'}
                    event={'Cool event'}
                    rank={'4.9'}
                    date={'June, 14 2023 '}
                    description={'«Wir haben das erste Mal einen Koch für ein Dinner mit unseren Freunden Zuhause gebucht. Die Buchung war...'}
                />
                <PEReviewCardMenu
                    chefName={'Maximilian'}
                    event={'Cool event'}
                    rank={'4.9'}
                    date={'June, 14 2023 '}
                    description={'«Wir haben das erste Mal einen Koch für ein Dinner mit unseren Freunden Zuhause gebucht. Die Buchung war...'}
                />
                <PEReviewCardPlatform
                    chefName={'Maximilian'}
                    position={'Master chef'}
                    rank={'4.9'}
                    location={'Berlin'}
                    date={'June, 14 2023 '}
                    description={'«Wir haben das erste Mal einen Koch für ein Dinner mit unseren Freunden Zuhause gebucht. Die Buchung war...'}
                />
            </div>
        </>
    );
};

export default Index;
