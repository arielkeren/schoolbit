import Head from "next/head";
import Title from "../components/general/Title";
import SignUpForm from "../components/sign-up/SignUpForm";

const SignUpPage: React.FC = () => (
  <>
    <Head>
      <title>Sign Up | SchoolBit</title>
    </Head>

    <Title title="Sign Up" />

    <SignUpForm />
  </>
);

export default SignUpPage;
