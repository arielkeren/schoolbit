import { AssignmentInterface } from "../types";
import Assignment from "./Assignment";

interface Props {
  assignments: AssignmentInterface[];
  classroomID: string;
}

const AssignmentList: React.FC<Props> = ({ assignments, classroomID }) => {
  return (
    <div className="flex justify-center w-full mt-5">
      <div className="flex flex-col items-center w-4/5 gap-2">
        {assignments.map((assignment) => (
          <Assignment
            assignment={assignment}
            classroomID={classroomID}
            key={assignment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default AssignmentList;
