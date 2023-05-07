import { ChangeEvent, useState } from "react";
import { IAnswer } from "../../types/types";
import CodeEditor from "../general/CodeEditor";
import { FaPenAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { ImCheckmark } from "react-icons/im";

interface Props {
  answer: IAnswer;
}

const Answer: React.FC<Props> = ({ answer }) => {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [language, setLanguage] = useState(answer.language);

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  const toggleIsCodeOpen = () =>
    setIsCodeOpen((previousState) => !previousState);

  const stopPropagation = (event: React.MouseEvent<HTMLAnchorElement>) =>
    event.stopPropagation();

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) =>
    setLanguage(event.target.value);

  return (
    <div>
      <div
        onClick={toggleIsCodeOpen}
        className={`flex justify-between items-center p-5 cursor-pointer rounded ${
          answer.checked ? "bg-gray-800" : "bg-gray-900"
        }`}
      >
        <h2 className="text-white text-2xl">{answer.senderName}</h2>

        {answer.checked ? (
          <Link
            href={`/classrooms/${classroomID}/assignments/${assignmentID}/answers/${answer.senderID}`}
            onClick={stopPropagation}
          >
            <ImCheckmark className="text-gray-300 text-3xl hover:text-gray-50 transition-colors" />
          </Link>
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
        <CodeEditor
          code={answer.code}
          language={language}
          changeLanguage={changeLanguage}
          height="500px"
          width="100%"
          isLanguageLocked={false}
        />
      )}
    </div>
  );
};

export default Answer;
