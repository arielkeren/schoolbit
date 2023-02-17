import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, ReactNode, useState } from "react";
import { auth, database } from "../../firebaseConfig";
import useAppContext from "../../hooks/useAppContext";
import Loading from "./Loading";

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

  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

    getUser().then(() => {
      if (isUserLoaded && !user && router.pathname !== "/")
        router.push("/").then(() => setIsLoading(false));
      else if ((isUserLoaded && !user) || user) setIsLoading(false);
    });
  }, [
    user,
    router,
    isUserLoaded,
    changeOwnedClassrooms,
    changeAttendedClassrooms,
    changeGrades,
  ]);

  onAuthStateChanged(auth, (currentUser) => {
    changeUser(currentUser);
    setIsUserLoaded(true);
    if (!user && currentUser) setIsLoading(true);
  });

  if (isLoading) return <Loading />;

  return <>{children}</>;
};

export default ContextSetter;
