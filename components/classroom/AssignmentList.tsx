import { AssignmentInterface } from "../../types";
import Assignment from "./Assignment";

interface Props {
  assignments: AssignmentInterface[];
  classroomID: string;
}

const AssignmentList: React.FC<Props> = ({ assignments, classroomID }) => (
  <div className="grid grid-cols-4 m-10 gap-3">
    {assignments.map((assignment) => (
      <Assignment
        assignment={assignment}
        classroomID={classroomID}
        key={assignment.id}
      />
    ))}
  </div>
);

export default AssignmentList;
