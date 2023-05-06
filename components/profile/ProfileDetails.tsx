import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import useModal from "../../hooks/useModal";
import Information from "../general/Information";
import ChangeProfileDetailsModal from "./ChangeProfileDetailsModal";

const ProfileDetails: React.FC = () => {
  const { user } = useAppContext();

  const [fieldToChange, setFieldToChange] = useState<
    "username" | "email" | "password"
  >("username");

  const [isModalOpen, openModal, closeModal] = useModal();

  if (!user)
    return (
      <Information
        primary="Not signed in"
        secondary="Sign in to use SchoolBit"
      />
    );

  const openUsernameModal = () => {
    setFieldToChange("username");
    openModal();
  };

  const openEmailModal = () => {
    setFieldToChange("email");
    openModal();
  };

  const openPasswordModal = () => {
    setFieldToChange("password");
    openModal();
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gray-900 p-7 rounded">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl text-gray-100 font-semibold">
            {user.displayName}
          </h1>
          <button
            onClick={openUsernameModal}
            className="uppercase text-gray-200 text-sm font-semibold"
          >
            Change
          </button>
        </div>
        <div>
          <p className="text-xl text-gray-100">
            Email: <span className="text-gray-500">{user.email}</span>
          </p>
          <button
            onClick={openEmailModal}
            className="uppercase text-gray-200 text-sm font-semibold"
          >
            Change
          </button>
          <p className="text-xl text-gray-100">
            Password: <span className="text-gray-500">••••••••••</span>
          </p>
          <button
            onClick={openPasswordModal}
            className="uppercase text-gray-200 text-sm font-semibold"
          >
            Change
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ChangeProfileDetailsModal field={fieldToChange} close={closeModal} />
      )}
    </>
  );
};

export default ProfileDetails;
