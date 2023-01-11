import { GradeInterface } from "../../types";
import Grade from "./Grade";

interface Props {
  grades: GradeInterface[];
}

const GradeList: React.FC<Props> = ({ grades }) => {
  return (
    <div className="flex flex-col gap-1 m-3">
      {grades.map((grade) => (
        <Grade grade={grade} key={grade.assignmentID} />
      ))}
    </div>
  );
};

export default GradeList;
