import { User } from "firebase/auth";
import Head from "next/head";
import Title from "../components/Title";
import ProfileDetails from "../components/ProfileDetails";

interface Props {
  user: User | null;
}

const ProfilePage: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Profile</title>
      </Head>

      <Title title="Profile" />

      <ProfileDetails user={user} />
    </>
  );
};

export default ProfilePage;
