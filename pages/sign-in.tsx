import Head from "next/head";
import SignInForm from "../components/sign-in/SignInForm";
import Title from "../components/general/Title";

const SignInPage: React.FC = () => (
  <>
    <Head>
      <title>Sign In | SchoolBit</title>
    </Head>

    <Title title="Sign In" />

    <SignInForm />
  </>
);

export default SignInPage;
