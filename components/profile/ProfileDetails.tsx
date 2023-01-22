import useAppContext from "../../hooks/useAppContext";

const ProfileDetails: React.FC = () => {
  const { user } = useAppContext();

  return (
    <>
      {user ? (
        <div className="flex justify-center m-10">
          <div className="flex flex-col gap-8">
            <p className="font-bold text-3xl">
              <span className="font-extrabold text-4xl mr-4 uppercase">
                Username
              </span>
              {user.displayName}
            </p>
            <hr className="border-2 border-gray-200" />
            <p className="font-bold text-3xl">
              <span className="font-extrabold text-4xl mr-4 uppercase">
                Email
              </span>
              {user.email}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-white text-center text-3xl font-bold">
          Log in to see your profile
        </p>
      )}
    </>
  );
};

export default ProfileDetails;
