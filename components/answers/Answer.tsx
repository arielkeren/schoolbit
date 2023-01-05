import { useState } from "react";
import { AnswerInterface } from "../../types";
import CodeEditor from "../general/CodeEditor";
import { FaPenAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  answer: AnswerInterface;
}

const Answer: React.FC<Props> = ({ answer }) => {
  const router = useRouter();

  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const { classroomID, assignmentID } = router.query;

  const toggleIsCodeOpen = () =>
    setIsCodeOpen((previousState) => !previousState);

  const stopPropagation = (event: React.MouseEvent<HTMLAnchorElement>) =>
    event.stopPropagation();

  return (
    <div>
      <div
        onClick={toggleIsCodeOpen}
        className={
          "flex justify-between items-center bg-gray-800 p-5 cursor-pointer " +
          (isCodeOpen ? "rounded-t-md" : "rounded-md")
        }
      >
        <h2 className="text-white text-2xl">{answer.senderName}</h2>
        <Link
          href={`/classrooms/${classroomID}/assignments/${assignmentID}/answers/${answer.senderID}`}
          className="p-3 rounded-full hover:bg-gray-700 transition-colors"
          onClick={stopPropagation}
        >
          <FaPenAlt className="text-white text-3xl" />
        </Link>
      </div>

      {isCodeOpen && (
        <CodeEditor code={answer.code} height="500px" width="100%" />
      )}
    </div>
  );
};

export default Answer;
