import { useRouter } from "next/router";
import useAppContext from "../../hooks/useAppContext";
import Answer from "./Answer";

const AnswerList: React.FC = () => {
  const { classroom } = useAppContext();

  const router = useRouter();
  const { assignmentID } = router.query;

  const assignments = classroom?.assignments;
  const assignment = assignments?.find(
    (currentAssignment) => currentAssignment.id === assignmentID
  );
  const answers = assignment?.answers;

  return (
    <>
      {answers ? (
        <>
          {answers.length !== 0 ? (
            <div className="flex flex-col gap-3 mx-10">
              {answers.map((answer) => (
                <Answer answer={answer} key={answer.senderID} />
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl">
              There are no submitted answers currently
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-2xl">Failed to get the answers</p>
      )}
    </>
  );
};

export default AnswerList;
