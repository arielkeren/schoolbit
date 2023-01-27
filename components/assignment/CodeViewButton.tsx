import { TbCode, TbCodeOff } from "react-icons/tb";

interface Props {
  isCodeView: boolean;
  toggleCodeView: () => void;
}

const ToggleCodeViewButton: React.FC<Props> = ({
  isCodeView,
  toggleCodeView,
}) => (
  <button onClick={toggleCodeView}>
    {isCodeView ? (
      <TbCode className="text-5xl text-gray-300" />
    ) : (
      <TbCodeOff className="text-5xl text-gray-300" />
    )}
  </button>
);

export default ToggleCodeViewButton;
