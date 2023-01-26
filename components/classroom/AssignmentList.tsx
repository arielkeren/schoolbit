import { useRouter } from "next/router";
import useAppContext from "../../hooks/useAppContext";
import EmptyArea from "../general/EmptyArea";
import Information from "../general/Information";
import Assignment from "./Assignment";

const AssignmentList: React.FC = () => {
  const { user, classroom } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  const ownerID = classroom?.ownerID;
  const isOwner = user?.uid === ownerID;

  if (!classroom)
    return (
      <Information
        primary="This classroom couldn't be accessed"
        secondary="Check with your teacher if you were accepted into the classroom"
      />
    );

  if (classroom.assignments.length === 0)
    return (
      <Information
        primary="Looks like there are no assignments here"
        secondary="Click the + icon on the left to add assignments"
      />
    );

  return (
    <div className="flex flex-col gap-2">
      {classroom.assignments.map((assignment) => (
        <Assignment
          assignment={assignment}
          classroomID={classroomID}
          isOwner={isOwner}
          key={assignment.id}
        />
      ))}
    </div>
  );
};

export default AssignmentList;
