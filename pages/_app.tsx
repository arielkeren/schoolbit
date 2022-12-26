import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, database } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ClassroomInterface, AssignmentInterface } from "../types";
import Header from "../components/general/Header";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [ownedClassrooms, setOwnedClassrooms] = useState<ClassroomInterface[]>(
    []
  );
  const [attendedClassrooms, setAttendedClassrooms] = useState<
    ClassroomInterface[]
  >([]);
  const [assignments, setAssignments] = useState<AssignmentInterface[] | null>(
    null
  );
  const [ownerID, setOwnerID] = useState<string | null>(null);

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

  const changeAssignments = useCallback(
    (assignmentArray: AssignmentInterface[]) => setAssignments(assignmentArray),
    []
  );

  const changeOwnerID = useCallback(
    (newOwnerID: string) => setOwnerID(newOwnerID),
    []
  );

  return (
    <div className={poppins.className}>
      <Header />
      <Component
        {...pageProps}
        ownedClassrooms={ownedClassrooms}
        attendedClassrooms={attendedClassrooms}
        assignments={assignments}
        ownerID={ownerID}
        changeAssignments={changeAssignments}
        changeOwnerID={changeOwnerID}
      />
    </div>
  );
};

export default App;
