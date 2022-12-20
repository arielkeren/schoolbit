import { HiUserGroup } from "react-icons/hi";
import { FiMail } from "react-icons/fi";

interface Props {
  openScreen: () => void;
  icon: string;
}

const OpenScreenButton: React.FC<Props> = ({ openScreen, icon }) => {
  return (
    <button
      onClick={openScreen}
      className={
        "absolute left-5 p-5 rounded-full shadow-xl bg-gray-800 hover:bg-gray-900 transition-colors " +
        (icon === "participants" ? "bottom-5" : "bottom-28")
      }
    >
      {icon === "requests" ? (
        <FiMail className="text-4xl text-white" />
      ) : (
        <HiUserGroup className="text-4xl text-white" />
      )}
    </button>
  );
};

export default OpenScreenButton;
