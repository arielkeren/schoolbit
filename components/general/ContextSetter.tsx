import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, ReactNode, useState } from "react";
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

  const [shouldRedirectToHomepage, setShouldRedirectToHomepage] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      if (!user) return;

      const userDocumentReference = doc(database, `users/${user.uid}`);
      const userDocumentSnapshot = await getDoc(userDocumentReference);
      const data = userDocumentSnapshot.data();

      changeOwnedClassrooms(data?.ownedClassrooms ?? []);
      changeAttendedClassrooms(data?.attendedClassrooms ?? []);
      changeGrades(data?.grades ?? []);
    };

    getUser();

    if (shouldRedirectToHomepage && router.pathname !== "/") router.push("/");
  }, [
    user,
    router,
    shouldRedirectToHomepage,
    changeOwnedClassrooms,
    changeAttendedClassrooms,
    changeGrades,
  ]);

  onAuthStateChanged(auth, (currentUser) => {
    changeUser(currentUser);

    if (currentUser) setShouldRedirectToHomepage(false);
    else setShouldRedirectToHomepage(true);
  });

  return <>{children}</>;
};

export default ContextSetter;
