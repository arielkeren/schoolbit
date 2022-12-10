import { auth } from "../firebaseConfig";
import styles from "../styles/ProfileDetails.module.css";

const ProfileDetails: React.FC = () => {
  const user = auth.currentUser;

  return (
    <>
      {user === null ? (
        <p className="text-white text-center text-3xl font-bold">
          Log in to see your profile...
        </p>
      ) : (
        <div className="flex justify-center m-10">
          <div className="flex flex-col gap-8">
            <p className="text-white font-bold text-3xl">
              <span className="font-extrabold text-3xl bg-gradient-to-r from-purple-400 to-pink-600 p-2 rounded-lg mr-4">
                Username
              </span>
              {user.displayName}
            </p>
            <hr className="border-2 border-cyan-200" />
            <p className="text-white font-bold text-3xl">
              <span className="font-extrabold text-3xl bg-gradient-to-r from-purple-400 to-pink-600 p-2 rounded-lg mr-4">
                Email
              </span>
              {user.email}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
