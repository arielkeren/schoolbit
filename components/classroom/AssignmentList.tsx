import { AssignmentInterface } from "../../types";
import Assignment from "./Assignment";

interface Props {
  assignments: AssignmentInterface[];
  classroomID: string;
  isOwner: boolean;
}

const AssignmentList: React.FC<Props> = ({
  assignments,
  classroomID,
  isOwner,
}) => (
  <div className="flex flex-col gap-2 m-3">
    {assignments.map((assignment) => (
      <Assignment
        assignment={assignment}
        classroomID={classroomID}
        isOwner={isOwner}
        key={assignment.id}
      />
    ))}
  </div>
);

export default AssignmentList;
