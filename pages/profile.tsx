import { signOut, User } from "firebase/auth";
import Head from "next/head";
import Title from "../components/Title";
import ProfileDetails from "../components/ProfileDetails";
import { auth } from "../firebaseConfig";

interface Props {
  user: User | null;
}

const ProfilePage: React.FC<Props> = ({ user }) => {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch {
      alert("Error logging out... Try again later");
    }
  };

  return (
    <>
      <Head>
        <title>Coding Classroom | Profile</title>
      </Head>

      <Title title="Profile" />

      <ProfileDetails user={user} />

      <button onClick={logOut}>Log out</button>
    </>
  );
};

export default ProfilePage;
