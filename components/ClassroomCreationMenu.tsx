import { useState } from "react";
import styles from "../styles/ClassroomCreationMenu.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, database } from "../firebaseConfig";
import { ClassroomDataInterface } from "../types";

interface Props {
  closeMenu: () => void;
}

const ClassroomCreationMenu: React.FC<Props> = ({ closeMenu }) => {
  const [name, setName] = useState("");

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const createClassroom = async () => {
    const collectionReference = collection(database, "classrooms");

    const user = auth.currentUser;

    if (user !== null && user.displayName !== null) {
      const classroomData: ClassroomDataInterface = {
        classroomName: name,
        ownerName: user.displayName,
        ownerID: user.uid,
        assignments: [],
      };

      let documentID: string | null = null;
      try {
        documentID = (await addDoc(collectionReference, classroomData)).id;
      } catch {
        alert("Error creating the classroom... Try again later");
      }

      if (documentID !== null) {
        const userClassroomData = {
          classroomName: name,
          classroomID: documentID,
        };

        const documentReference = doc(database, `users/${user.uid}`);

        try {
          await setDoc(
            documentReference,
            {
              ownedClassrooms: arrayUnion(userClassroomData),
            },
            { merge: true }
          );
        } catch {
          alert(
            "Error linking the classroom with the user... Try again later "
          );
        }
      } else
        alert(
          "Error getting the classroom's data to link it with the user... Try again later"
        );
    } else alert("Error handling the user's data... Try again later");
  };

  const checkNameValidity = () => {
    if (name.replaceAll(" ", "") === "") {
      setName("");
      alert("Cannot create a classroom without a name...");
    } else {
      createClassroom();
      closeMenu(); // Create the classroom here
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
        <h2 className={styles.title}>Create a Classroom</h2>
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

export default ClassroomCreationMenu;
