import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, ReactNode } from "react";
import { auth, database } from "../../firebaseConfig";
import useAppContext from "../../hooks/useAppContext";

interface Props {
  children: ReactNode;
}

const ContextSetter: React.FC<Props> = ({ children }) => {
  const {
    user,
    changeUser,
    changeOwnedClassrooms,
    changeAttendedClassrooms,
    changeGrades,
  } = useAppContext();

  useEffect(() => {
    const getUserData = async () => {
      if (!user) return;

      const userDocumentReference = doc(database, `users/${user.uid}`);
      const userDocumentSnapshot = await getDoc(userDocumentReference);
      const data = userDocumentSnapshot.data();

      changeOwnedClassrooms(data?.ownedClassrooms ?? []);
      changeAttendedClassrooms(data?.attendedClassrooms ?? []);
      changeGrades(data?.grades ?? []);
    };

    getUserData();
  }, [user, changeOwnedClassrooms, changeAttendedClassrooms, changeGrades]);

  onAuthStateChanged(auth, (currentUser) => {
    changeUser(currentUser);

    if (!currentUser) {
      changeOwnedClassrooms([]);
      changeAttendedClassrooms([]);
    }
  });

  return <>{children}</>;
};

export default ContextSetter;
