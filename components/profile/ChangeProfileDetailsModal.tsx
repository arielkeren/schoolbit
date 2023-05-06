import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import useAppContext from "../../hooks/useAppContext";

interface Props {
  field: "username" | "email" | "password";
  close: () => void;
}

const ChangeProfileDetailsModal: React.FC<Props> = ({ field, close }) => {
  const { user } = useAppContext();

  const [fieldValue, setFieldValue] = useState("");

  const changeFieldValue = (event: ChangeEvent<HTMLInputElement>) =>
    setFieldValue(event?.target.value);

  const changeField = () => {
    if (!user) return;

    switch (field) {
      case "username":
        updateProfile(user, { displayName: fieldValue });
        break;
      case "email":
        updateEmail(user, fieldValue);
        break;
      case "password":
        updatePassword(user, fieldValue);
    }

    close();
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div
      onClick={close}
      className="fixed top-0 h-screen left-0 w-screen backdrop-brightness-90 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="relative w-72 bg-white py-20 flex flex-col justify-center items-center rounded shadow-md sm:w-96"
      >
        <button
          onClick={close}
          className="absolute top-2 right-2 rounded transition-colors hover:bg-gray-200"
        >
          <GrFormClose className="text-4xl" />
        </button>

        <div className="absolute top-2">
          <h2 className="uppercase text-lg font-bold sm:text-xl">
            Change {field}
          </h2>
        </div>

        <form className="flex flex-col items-center">
          <label htmlFor={field} className="font-medium">
            New {field[0].toUpperCase() + field.substring(1)}
          </label>
          <input
            type="text"
            name={field}
            id={field}
            value={fieldValue}
            onChange={changeFieldValue}
            className="bg-gray-100 p-1 rounded outline-none focus:bg-gray-200 "
          />
        </form>

        <div className="absolute bottom-2 right-2 flex gap-1">
          <button
            onClick={close}
            className="bg-gray-200 p-2 rounded font-medium uppercase transition-colors hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={changeField}
            className="bg-gray-900 p-2 rounded font-medium text-white uppercase transition-colors hover:bg-gray-950"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfileDetailsModal;
