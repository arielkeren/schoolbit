import Head from "next/head";
import Title from "../../../../../components/general/Title";
import EditAssignmentForm from "../../../../../components/edit-assignment/EditAssignmentForm";
import { AssignmentInterface } from "../../../../../types";

interface Props {
  assignments: AssignmentInterface[];
  changeAssignments: (assignmentArray: AssignmentInterface[]) => void;
}

const EditAssignmentPage: React.FC<Props> = ({
  assignments,
  changeAssignments,
}) => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Edit Assignment</title>
      </Head>

      <Title title="Edit Assignment" />

      <EditAssignmentForm
        assignments={assignments}
        changeAssignments={changeAssignments}
      />
    </>
  );
};

export default EditAssignmentPage;
