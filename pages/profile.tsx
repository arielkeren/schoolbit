import Head from "next/head";
import EmptyArea from "../components/general/EmptyArea";
import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";
import SignOutButton from "../components/profile/SignOutButton";
import ProfileDetails from "../components/profile/ProfileDetails";

const ProfilePage: React.FC = () => (
  <>
    <Head>
      <title>Profile | SchoolBit</title>
    </Head>

    <Header title="Profile" />

    <Sidebar />

    <EmptyArea>
      <ProfileDetails />

      <SignOutButton />
    </EmptyArea>
  </>
);

export default ProfilePage;
