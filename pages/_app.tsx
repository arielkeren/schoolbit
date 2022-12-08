import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, database } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ClassroomInterface, AssignmentInterface } from "../types";
import Header from "../components/Header";

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [ownedClassrooms, setOwnedClassrooms] = useState<ClassroomInterface[]>(
    []
  );
  const [attendedClassrooms, setAttendedClassrooms] = useState<
    ClassroomInterface[]
  >([]);
  const [assignments, setAssignments] = useState<AssignmentInterface[]>([]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (currentUser === null) {
      setOwnedClassrooms([]);
      setAttendedClassrooms([]);
    }
  });

  useEffect(() => {
    const getUserData = async () => {
      if (user === null) return;

      const userDocumentReference = doc(database, `users/${user.uid}`);
      const userDocumentSnapshot = await getDoc(userDocumentReference);

      setOwnedClassrooms(userDocumentSnapshot.data()?.ownedClassrooms ?? []);
      setAttendedClassrooms(
        userDocumentSnapshot.data()?.attendedClassrooms ?? []
      );
    };

    getUserData();
  }, [user]);

  const changeAssignments = (assignmentArray: AssignmentInterface[]) =>
    setAssignments(assignmentArray);

  return (
    <>
      <Header />
      <Component
        {...pageProps}
        user={user}
        ownedClassrooms={ownedClassrooms}
        attendedClassrooms={attendedClassrooms}
        assignments={assignments}
        changeAssignments={changeAssignments}
      />
    </>
  );
};

export default App;
