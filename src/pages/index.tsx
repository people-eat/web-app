import { type NextPage } from "next";
import Head from "next/head";
import PeopleEatButton from "~/components/standard/PeopleEatButton";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>PeopleEat</title>
        <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to PeopleEat</h1>
        <PeopleEatButton />
      </main>
    </>
  );
};

export default HomePage;
