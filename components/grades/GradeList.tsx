import useAppContext from "../../hooks/useAppContext";
import Grade from "./Grade";

const GradeList: React.FC = () => {
  const { grades } = useAppContext();

  return (
    <>
      {grades && grades.length !== 0 ? (
        <div className="flex flex-col gap-1 m-3">
          {grades.map((grade) => (
            <Grade grade={grade} key={grade.assignmentID} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl">You have no grades currently</p>
      )}
    </>
  );
};

export default GradeList;
