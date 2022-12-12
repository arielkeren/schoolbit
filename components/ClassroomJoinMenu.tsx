import { useEffect, useState } from "react";
import styles from "../styles/AssignmentCreationMenu.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { auth, database } from "../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { RequestInterface } from "../types";

interface Props {
  closeMenu: () => void;
}

const ClassroomJoinMenu: React.FC<Props> = ({ closeMenu }) => {
  const [classroomCode, setClassroomCode] = useState("");

  const user = auth.currentUser;

  const changeClassroomCode = (event: React.ChangeEvent<HTMLInputElement>) =>
    setClassroomCode(event.target.value);

  const sendClassroomJoinRequest = async () => {
    if (user === null || user.displayName === null) return;

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomCode}`
    );

    const newJoinRequest: RequestInterface = {
      senderName: user.displayName,
      senderID: user.uid,
    };

    try {
      await updateDoc(classroomDocumentReference, {
        requests: arrayUnion(newJoinRequest),
      });
    } catch {
      alert("Classroom doesn't exist");
    }
  };

  const checkClassroomCodeValidity = () => {
    if (classroomCode.length !== 20) {
      alert("Invalid classroom code");
      return;
    }

    sendClassroomJoinRequest();
  };

  const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    checkClassroomCodeValidity();
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  const detectEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkClassroomCodeValidity();
    }
  };

  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm"
      onClick={closeMenu}
    >
      <div className={styles.innerContainer} onClick={stopPropagation}>
        <h2 className={styles.title}>Join Classroom</h2>
        <button onClick={closeMenu} className={styles.closeButton}>
          <IoMdClose className={styles.closeIcon} />
        </button>
        <input
          type="text"
          value={classroomCode}
          onChange={changeClassroomCode}
          placeholder="Code"
          onKeyDown={detectEnterKey}
          autoFocus
          className={styles.textField}
        />
        <button onClick={preventDefault} className={styles.addButton}>
          <IoMdAdd className={styles.addIcon} />
        </button>
      </div>
    </div>
  );
};

export default ClassroomJoinMenu;
