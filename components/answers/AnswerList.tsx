import IAnswer from "../../types/IAnswer";
import Information from "../general/Information";
import Answer from "./Answer";

interface Props {
  answers: IAnswer[];
}

const AnswerList: React.FC<Props> = ({ answers }) => {
  if (answers.length === 0)
    return (
      <Information
        primary="Looks like no students have submitted any answers yet"
        secondary="Come back here later and see if this changed"
      />
    );

  return (
    <div className="flex flex-col gap-3 mx-10">
      {answers.map((answer) => (
        <Answer answer={answer} key={answer.senderID} />
      ))}
    </div>
  );
};

export default AnswerList;
