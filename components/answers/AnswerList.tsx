import { AnswerInterface } from "../../types";
import Answer from "./Answer";

interface Props {
  answers: AnswerInterface[];
}

const AnswerList: React.FC<Props> = ({ answers }) => {
  return (
    <div className="flex flex-col gap-3 mx-10">
      {answers.map((answer) => (
        <Answer answer={answer} key={answer.senderID} />
      ))}
    </div>
  );
};

export default AnswerList;
