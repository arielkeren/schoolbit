import { GradeInterface } from "../../types";

interface Props {
  grade: GradeInterface;
}

const Grade: React.FC<Props> = ({ grade }) => {
  return (
    <div className="flex justify-between items-center bg-gray-900 p-4">
      <div>
        <h2 className="text-gray-50 text-xl">{grade.assignmentName}</h2>
        <p className="text-slate-300">{grade.message}</p>
      </div>
      <p className="text-gray-100 text-2xl">{grade.grade}</p>
    </div>
  );
};

export default Grade;
