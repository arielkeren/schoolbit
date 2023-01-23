import useAppContext from "../../hooks/useAppContext";
import Grade from "./Grade";

const GradeList: React.FC = () => {
  const { grades } = useAppContext();

  if (grades?.length === 0)
    return (
      <>
        <p className="text-3xl font-medium">
          Looks like you don&apos;t have any grades yet
        </p>
        <p className="text-xl">Submit code to an assignment to get graded</p>
      </>
    );

  return (
    <div className="flex flex-col gap-1">
      {grades?.map((grade) => (
        <Grade grade={grade} key={grade.assignmentID} />
      ))}
    </div>
  );
};

export default GradeList;
