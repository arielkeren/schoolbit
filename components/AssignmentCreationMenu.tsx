import { useState } from "react";
import styles from "../styles/AssignmentCreationMenu.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";

interface Props {
  closeMenu: () => void;
  classroomID: string;
}

const AssignmentCreationMenu: React.FC<Props> = ({
  closeMenu,
  classroomID,
}) => {
  const router = useRouter();

  const [name, setName] = useState("");

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const redirectToAssignmentCreationPage = () => {
    const modifiedName = name.trim().replace(/\s{2,}/g, " ");

    router.push(`/classrooms/${classroomID}/create-assignment/${modifiedName}`);
  };

  const checkNameValidity = () => {
    if (name.replaceAll(" ", "") === "") {
      setName("");
      alert("Cannot create an assignment without a name...");
    } else {
      redirectToAssignmentCreationPage();
      closeMenu();
    }
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  const detectEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkNameValidity();
    }
  };

  return (
    <div className={styles.outerContainer} onClick={closeMenu}>
      <div className={styles.innerContainer} onClick={stopPropagation}>
        <h2 className={styles.title}>Create an Assignment</h2>
        <button onClick={closeMenu} className={styles.closeButton}>
          <IoMdClose className={styles.closeIcon} />
        </button>
        <input
          type="text"
          value={name}
          onChange={changeName}
          placeholder={"Name"}
          onKeyDown={detectEnterKey}
          autoFocus
          className={styles.textField}
        />
        <button onClick={checkNameValidity} className={styles.addButton}>
          <IoMdAdd className={styles.addIcon} />
        </button>
      </div>
    </div>
  );
};

export default AssignmentCreationMenu;
