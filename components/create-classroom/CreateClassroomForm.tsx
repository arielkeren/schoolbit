import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { database } from "../../firebaseConfig";
import { IClassroomData, IClassroom } from "../../types/types";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/router";
import useAppContext from "../../hooks/useAppContext";
import Classroom from "../general/Classroom";
import ClassroomPreview from "./ClassroomPreview";

const CreateClassroomForm: React.FC = () => {
  const { user, addOwnedClassroom } = useAppContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#aabbcc");

  const router = useRouter();

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const createClassroom = async () => {
    const classroomsCollectionReference = collection(database, "classrooms");

    if (!user?.displayName) return;

    const classroomData: IClassroomData = {
      classroomName: name,
      description,
      color,
      ownerName: user.displayName,
      ownerID: user.uid,
      assignments: [],
      participants: [],
      requests: [],
    };

    let classroomDocumentID: string | null = null;
    try {
      classroomDocumentID = (
        await addDoc(classroomsCollectionReference, classroomData)
      ).id;
    } catch {
      alert("Failed to create the classroom");
      return;
    }

    const userClassroomData: IClassroom = {
      classroomName: name,
      ownerName: user.displayName,
      description,
      color,
      classroomID: classroomDocumentID,
    };

    const userDocumentReference = doc(database, `users/${user.uid}`);

    try {
      await setDoc(
        userDocumentReference,
        {
          ownedClassrooms: arrayUnion(userClassroomData),
        },
        { merge: true }
      );
    } catch {
      alert("Failed to connect the classroom");
      return;
    }

    addOwnedClassroom(userClassroomData);
    router.push("/my-classrooms");
  };

  const validateData = () => {
    if (name.replaceAll(" ", "") === "") {
      setName("");
      alert("Cannot create a classroom without a name");
    } else createClassroom();
  };

  const preventDefault = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    validateData();
  };

  return (
    <div className="flex flex-col items-center sm:flex-row lg:w-3/4 m-auto">
      <form className="flex justify-center mb-10 w-full">
        <div className="w-full flex flex-col items-center gap-3 lg:w-11/12 xl:w-1/2">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-start">
              <label
                htmlFor="name"
                className="text-lg text-gray-100 font-bold md:text-xl"
              >
                Give It a Good Name
              </label>
            </div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={changeName}
              autoFocus
              className="p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors md:text-lg"
            />
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="flex justify-start">
              <label
                htmlFor="description"
                className="text-lg text-gray-100 font-bold md:text-xl"
              >
                A Little Description
              </label>
            </div>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={changeDescription}
              className="p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors md:text-lg"
            />
          </div>

          <div className="flex flex-col items-center w-full m-5 gap-2">
            <div className="flex justify-center w-4/5">
              <h3 className="text-xl text-gray-100 font-extrabold md:text-2xl">
                Banner Color
              </h3>
            </div>
            <HexColorPicker
              color={color}
              onChange={setColor}
              className="shadow-xl"
            />
          </div>

          <input
            type="submit"
            value="Create"
            onClick={preventDefault}
            className="mt-5 bg-gray-900 text-white py-3 px-12 rounded font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
          />
        </div>
      </form>

      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <h2 className="text-gray-100 text-3xl font-bold uppercase">Preview</h2>
        <ClassroomPreview
          name={name}
          description={description}
          owner={user?.displayName ?? ""}
          color={color}
        />
      </div>
    </div>
  );
};

export default CreateClassroomForm;
