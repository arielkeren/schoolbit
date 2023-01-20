import { useState } from "react";
import { AnswerInterface } from "../../types/types";
import CodeEditor from "../general/CodeEditor";
import { FaPenAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { ImCheckmark } from "react-icons/im";

interface Props {
  answer: AnswerInterface;
}

const Answer: React.FC<Props> = ({ answer }) => {
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const router = useRouter();
  const { classroomID, assignmentID } = router.query;

  const toggleIsCodeOpen = () =>
    setIsCodeOpen((previousState) => !previousState);

  const stopPropagation = (event: React.MouseEvent<HTMLAnchorElement>) =>
    event.stopPropagation();

  return (
    <div>
      <div
        onClick={toggleIsCodeOpen}
        className={`flex justify-between items-center p-5 cursor-pointer ${
          answer.checked ? "bg-gray-600" : "bg-gray-800"
        } ${isCodeOpen ? "rounded-t-md" : "rounded-md"}`}
      >
        <h2 className="text-white text-2xl">{answer.senderName}</h2>

        {answer.checked ? (
          <ImCheckmark className="text-gray-300 text-3xl" />
        ) : (
          <Link
            href={`/classrooms/${classroomID}/assignments/${assignmentID}/answers/${answer.senderID}`}
            onClick={stopPropagation}
          >
            <FaPenAlt className="text-gray-300 text-3xl hover:text-gray-50 transition-colors" />
          </Link>
        )}
      </div>

      {isCodeOpen && (
        <CodeEditor code={answer.code} height="500px" width="100%" />
      )}
    </div>
  );
};

export default Answer;
