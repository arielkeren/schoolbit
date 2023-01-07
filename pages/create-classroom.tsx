import Head from "next/head";
import Title from "../components/general/Title";
import CreateClassroomForm from "../components/create-classroom/CreateClassroomForm";
import { ClassroomInterface } from "../types";

interface Props {
  addOwnedClassroom: (newClassroom: ClassroomInterface) => void;
}

const CreateClassroomPage: React.FC<Props> = ({ addOwnedClassroom }) => {
  return (
    <>
      <Head>
        <title>Create Classroom | SchoolBit</title>
      </Head>

      <Title title="Create Classroom" />

      <CreateClassroomForm addOwnedClassroom={addOwnedClassroom} />
    </>
  );
};

export default CreateClassroomPage;
