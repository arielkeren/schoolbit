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
        "absolute left-5 p-5 rounded-full shadow-md bg-slate-800 hover:bg-gradient-to-r from-purple-400 to-pink-600 " +
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
