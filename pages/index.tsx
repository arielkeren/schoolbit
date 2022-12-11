import Head from "next/head";
import { useState } from "react";
import ClassroomCreationMenu from "../components/ClassroomCreationMenu";
import ClassroomJoinMenu from "../components/ClassroomJoinMenu";
import ClassroomList from "../components/ClassroomList";
import Title from "../components/Title";
import { ClassroomInterface } from "../types";

interface Props {
  ownedClassrooms: ClassroomInterface[];
  attendedClassrooms: ClassroomInterface[];
}

const Home: React.FC<Props> = ({ ownedClassrooms, attendedClassrooms }) => {
  const [isClassroomCreationMenuOpen, setIsClassroomCreationMenuOpen] =
    useState(false);
  const [isClassroomJoinMenuOpen, setIsClassroomJoinMenuOpen] = useState(false);

  const openClassroomCreationMenu = () => setIsClassroomCreationMenuOpen(true);

  const closeClassroomCreationMenu = () =>
    setIsClassroomCreationMenuOpen(false);

  const openClassroomJoinMenu = () => setIsClassroomJoinMenuOpen(true);

  const closeClassroomJoinMenu = () => setIsClassroomJoinMenuOpen(false);

  return (
    <>
      <Head>
        <title>Coding Classroom</title>
      </Head>

      <Title title="My Classrooms" />

      <ClassroomList
        classrooms={ownedClassrooms}
        classroomsType="owned"
        openClassroomCreationMenu={openClassroomCreationMenu}
        openClassroomJoinMenu={openClassroomJoinMenu}
      />

      <Title title="Attended Classrooms" />

      <ClassroomList
        classrooms={attendedClassrooms}
        classroomsType="attended"
        openClassroomCreationMenu={openClassroomCreationMenu}
        openClassroomJoinMenu={openClassroomJoinMenu}
      />

      {isClassroomCreationMenuOpen && (
        <ClassroomCreationMenu closeMenu={closeClassroomCreationMenu} />
      )}

      {isClassroomJoinMenuOpen && (
        <ClassroomJoinMenu closeMenu={closeClassroomJoinMenu} />
      )}
    </>
  );
};

export default Home;
