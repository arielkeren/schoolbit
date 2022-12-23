import Head from "next/head";
import LoginForm from "../components/login/LoginForm";
import Title from "../components/general/Title";

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
