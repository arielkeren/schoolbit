import Head from "next/head";
import Title from "../components/general/Title";
import LogOutButton from "../components/profile/LogOutButton";
import ProfileDetails from "../components/profile/ProfileDetails";

const ProfilePage: React.FC = () => (
  <>
    <Head>
      <title>Profile | SchoolBit</title>
    </Head>

    <Title title="Profile" />

    <ProfileDetails />

    <LogOutButton />
  </>
);

export default ProfilePage;
