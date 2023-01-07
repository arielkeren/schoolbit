import { HiUserGroup } from "react-icons/hi";
import { FiMail } from "react-icons/fi";

interface Props {
  openModal: () => void;
  icon: "participants" | "requests";
}

const OpenModalButton: React.FC<Props> = ({ openModal, icon }) => (
  <button
    onClick={openModal}
    className={`absolute left-5 p-5 rounded-full shadow-xl bg-gray-800 hover:bg-gray-900 transition-colors ${
      icon === "participants" ? "bottom-5" : "bottom-28"
    }`}
  >
    {icon === "participants" ? (
      <HiUserGroup className="text-4xl text-white" />
    ) : (
      <FiMail className="text-4xl text-white" />
    )}
  </button>
);

export default OpenModalButton;
