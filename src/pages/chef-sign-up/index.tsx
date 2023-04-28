import { type NextPage } from 'next';
import Head from 'next/head';
import CookSignUpPage from '../../components/pages/cookSignUp';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Chef Sign Up</title>
                <meta name="description" content="PeopleEat - Sign Up" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CookSignUpPage
                languages={[
                    { languageId: 'A', title: 'German' },
                    { languageId: 'B', title: 'English' },
                    { languageId: 'C', title: 'French' },
                    { languageId: 'D', title: 'Russian' },
                ]}
            />
        </>
    );
};

export default Index;
