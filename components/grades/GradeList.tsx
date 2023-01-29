import useAppContext from "../../hooks/useAppContext";
import Information from "../general/Information";
import Grade from "./Grade";

const GradeList: React.FC = () => {
  const { grades } = useAppContext();

  if (grades?.length === 0)
    return (
      <Information
        primary="Looks like you don't have any grades yet"
        secondary="Submit code to an assignment to get graded"
      />
    );

  return (
    <div className="flex flex-col gap-1">
      {grades?.map((grade, index) => (
        <Grade grade={grade} key={index} />
      ))}
    </div>
  );
};

export default GradeList;
