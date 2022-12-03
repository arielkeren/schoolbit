import Head from "next/head";
import LoginForm from "../components/LoginForm";
import Title from "../components/Title";

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Login</title>
      </Head>

      <Title title="Login" />

      <LoginForm />
    </>
  );
};

export default LoginPage;
