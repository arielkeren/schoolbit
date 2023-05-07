import { useState } from "react";
import { IGrade } from "../../types/types";
import CodeEditor from "../general/CodeEditor";
import CommentList from "../general/CommentList";

interface Props {
  grade: IGrade;
}

const Grade: React.FC<Props> = ({ grade }) => {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);

  const toggleCode = () => setIsCodeOpen((previousState) => !previousState);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setLanguage(event.target.value);

  const numberOfLines = grade.code.split(/\r*\n/).length;

  return (
    <div>
      <div
        onClick={toggleCode}
        className="flex justify-between items-center cursor-pointer bg-gray-900 p-4 rounded transition-colors hover:bg-gray-800"
      >
        <div>
          <h2 className="text-gray-50 text-xl">{grade.assignmentName}</h2>
          <p className="text-slate-300">
            {grade.classroomName} · {grade.teacherName}
          </p>
        </div>
        <p className="text-gray-100 text-2xl">{grade.grade}</p>
      </div>

      {isCodeOpen && (
        <div className="relative">
          <CodeEditor
            height={`${(numberOfLines + 1) * 34.15}px`}
            width="100%"
            code={grade.code}
            language={language ?? grade.language}
            changeLanguage={changeLanguage}
            isLanguageLocked={false}
          />

          <CommentList
            numberOfLines={numberOfLines}
            comments={grade.comments}
            isFullScreen={false}
          />
        </div>
      )}
    </div>
  );
};

export default Grade;
