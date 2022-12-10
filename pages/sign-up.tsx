import Head from "next/head";
import Title from "../components/Title";
import SignUpForm from "../components/SignUpForm";

const SignUpPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Sign up</title>
      </Head>

      <Title title="Sign Up" />

      <SignUpForm />
    </>
  );
};

export default SignUpPage;
