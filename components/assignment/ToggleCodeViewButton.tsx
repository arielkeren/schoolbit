import { TbCode, TbCodeOff } from "react-icons/tb";

interface Props {
  isCodeView: boolean;
  toggleCodeView: () => void;
}

const ToggleCodeViewButton: React.FC<Props> = ({
  isCodeView,
  toggleCodeView,
}) => (
  <button
    onClick={toggleCodeView}
    className="absolute bottom-5 right-5 rounded-full p-2 bg-gray-900 hover:bg-gray-800 transition-colors"
  >
    {isCodeView ? (
      <TbCode className="text-white text-6xl" />
    ) : (
      <TbCodeOff className="text-white text-6xl" />
    )}
  </button>
);

export default ToggleCodeViewButton;
