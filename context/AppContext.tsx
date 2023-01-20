import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useState, ReactNode, useCallback } from "react";
import { database } from "../firebaseConfig";
import { IClassroomData, IClassroom, IGrade } from "../types/types";

interface StateInterface {
  user: User | null;
  classroom: IClassroomData | null;
  ownedClassrooms: IClassroom[] | null;
  attendedClassrooms: IClassroom[] | null;
  grades: IGrade[] | null;
  changeUser: (newUser: User | null) => void;
  changeClassroom: (newClassroom: IClassroomData) => void;
  changeOwnedClassrooms: (newOwnedClassrooms: IClassroom[]) => void;
  changeAttendedClassrooms: (IGrade: IClassroom[]) => void;
  changeGrades: (newGrades: IGrade[]) => void;
  addOwnedClassroom: (newOwnedClassroom: IClassroom) => void;
  getClassroom: (classroomID: string) => void;
}

interface Props {
  children: ReactNode;
}

const defaultState: StateInterface = {
  user: null,
  classroom: null,
  ownedClassrooms: null,
  attendedClassrooms: null,
  grades: null,
  changeUser(newUser) {
    return;
  },
  changeClassroom(newClassroom) {
    return;
  },
  changeOwnedClassrooms(newOwnedClassrooms) {
    return;
  },
  changeAttendedClassrooms(newAttendedClassrooms) {
    return;
  },
  addOwnedClassroom(newOwnedClassroom) {
    return;
  },
  changeGrades(newGrades) {
    return;
  },
  getClassroom(classroomID) {
    return;
  },
};

export const AppContext = createContext(defaultState);

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [classroom, setClassroom] = useState<IClassroomData | null>(null);
  const [ownedClassrooms, setOwnedClassrooms] = useState<IClassroom[] | null>(
    null
  );
  const [attendedClassrooms, setAttendedClassrooms] = useState<
    IClassroom[] | null
  >(null);
  const [grades, setGrades] = useState<IGrade[] | null>(null);
  const [currentClassroomID, setCurrentClassroomID] = useState<string | null>(
    null
  );

  const changeUser = useCallback(
    (newUser: User | null) => setUser(newUser),
    []
  );

  const changeClassroom = useCallback(
    (newClassroom: IClassroomData) => setClassroom(newClassroom),
    []
  );

  const changeOwnedClassrooms = useCallback(
    (newOwnedClassrooms: IClassroom[]) =>
      setOwnedClassrooms(newOwnedClassrooms),
    []
  );

  const changeAttendedClassrooms = useCallback(
    (newAttendedClassrooms: IClassroom[]) =>
      setAttendedClassrooms(newAttendedClassrooms),
    []
  );

  const changeGrades = useCallback(
    (newGrades: IGrade[]) => setGrades(newGrades),
    []
  );

  const addOwnedClassroom = useCallback(
    (newOwnedClassroom: IClassroom) =>
      setOwnedClassrooms((previousOwnedClassrooms) => [
        ...(previousOwnedClassrooms ?? []),
        newOwnedClassroom,
      ]),
    []
  );

  const getClassroom = useCallback(
    async (classroomID: string) => {
      if (
        (classroom && currentClassroomID === classroomID) ||
        (!ownedClassrooms?.some(
          (classroom) => classroom.classroomID === classroomID
        ) &&
          !attendedClassrooms?.some(
            (classroom) => classroom.classroomID === classroomID
          ))
      )
        return;

      const classroomDocumentReference = doc(
        database,
        `classrooms/${classroomID}`
      );
      const classroomDocumentSnapshot = await getDoc(
        classroomDocumentReference
      );
      const data = classroomDocumentSnapshot.data();

      changeClassroom(data as IClassroomData);

      setCurrentClassroomID(classroomID);
    },
    [
      classroom,
      ownedClassrooms,
      attendedClassrooms,
      currentClassroomID,
      changeClassroom,
    ]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        classroom,
        ownedClassrooms,
        attendedClassrooms,
        grades,
        changeUser,
        changeClassroom,
        changeOwnedClassrooms,
        changeAttendedClassrooms,
        changeGrades,
        addOwnedClassroom,
        getClassroom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
