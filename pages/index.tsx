import Head from "next/head";
import CategoryCardsContainer from "../components/CategoryCardsContainer";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Coding Classroom</title>
      </Head>

      <CategoryCardsContainer />
    </>
  );
};

export default Home;
