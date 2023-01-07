import Head from "next/head";
import Title from "../../../../../components/general/Title";
import EditAssignmentForm from "../../../../../components/edit-assignment/EditAssignmentForm";
import { AssignmentInterface, ClassroomInterface } from "../../../../../types";
import { useRouter } from "next/router";

interface Props {
  ownedClassrooms: ClassroomInterface[];
  assignments: AssignmentInterface[];
  changeAssignments: (assignmentArray: AssignmentInterface[]) => void;
}

const EditAssignmentPage: React.FC<Props> = ({
  ownedClassrooms,
  assignments,
  changeAssignments,
}) => {
  const router = useRouter();
  const { classroomID } = router.query;

  return (
    <>
      <Head>
        <title>Edit Assignment | SchoolBit</title>
      </Head>

      <Title title="Edit Assignment" />

      {ownedClassrooms.some(
        (classroom) => classroom.classroomID === classroomID
      ) ? (
        <EditAssignmentForm
          assignments={assignments}
          changeAssignments={changeAssignments}
        />
      ) : (
        <p className="text-center text-2xl">
          Failed to get an assignment to edit
        </p>
      )}
    </>
  );
};

export default EditAssignmentPage;
