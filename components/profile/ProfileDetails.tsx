import useAppContext from "../../hooks/useAppContext";
import Information from "../general/Information";

const ProfileDetails: React.FC = () => {
  const { user } = useAppContext();

  if (!user)
    return (
      <Information
        primary="Not signed in"
        secondary="Sign in to use SchoolBit"
      />
    );

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-bold uppercase sm:text-2xl">Signed in as</p>
      <p className="text-lg font-medium sm:text-xl">{user.displayName}</p>
      <p className="sm:text-lg">{user.email}</p>
    </div>
  );
};

export default ProfileDetails;
