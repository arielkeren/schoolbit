import { signOut } from "firebase/auth";
import Head from "next/head";
import Title from "../components/Title";
import ProfileDetails from "../components/ProfileDetails";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";

const ProfilePage: React.FC = () => {
  const router = useRouter();

  const user = auth.currentUser;

  const logOut = async () => {
    try {
      await signOut(auth);

      router.push("/");
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

      <ProfileDetails />

      {user !== null && (
        <div className="flex justify-center m-14">
          <button
            onClick={logOut}
            className="bg-blue-600 text-white py-2 px-5 rounded-lg font-semibold text-2xl hover:bg-blue-700 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
