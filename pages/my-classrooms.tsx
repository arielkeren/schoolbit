import Head from "next/head";
import ClassroomList from "../components/ClassroomList";
import Title from "../components/Title";
import ClassroomInterface from "../types";
import CreateClassroomButton from "../components/CreateClassroomButton";
import ClassroomCreationMenu from "../components/ClassroomCreationMenu";
import { useState } from "react";

interface Props {
  ownedClassrooms: ClassroomInterface[];
}

const MyClassroomsPage: React.FC<Props> = ({ ownedClassrooms }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Head>
        <title>Coding Classroom | My Classrooms</title>
      </Head>

      <Title title="My Classrooms" />

      <ClassroomList classrooms={ownedClassrooms} />

      <CreateClassroomButton openMenu={openMenu} />

      {isMenuOpen && <ClassroomCreationMenu closeMenu={closeMenu} />}
    </>
  );
};

export default MyClassroomsPage;
