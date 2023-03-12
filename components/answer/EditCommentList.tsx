import EditCommentButton from "./EditCommentButton";
import IComment from "../../types/IComment";

interface Props {
  numberOfLines: number;
  comments: IComment[];
  addComment: (lineNumber: number) => void;
  changeCommentText: (lineNumber: number, newText: string) => void;
  deleteComment: (lineNumber: number) => void;
}

const EditCommentList: React.FC<Props> = ({
  numberOfLines,
  comments,
  addComment,
  changeCommentText,
  deleteComment,
}) => {
  const commentContents = [];

  for (let i = 0; i < numberOfLines; i++) {
    commentContents.push("");
  }

  comments.forEach(
    (comment) => (commentContents[comment.line - 1] = comment.text)
  );

  return (
    <div className="absolute top-[152px] left-[125px] flex flex-col gap-[10px]">
      {commentContents.map((commentContent, index) => (
        <EditCommentButton
          lineNumber={index + 1}
          text={commentContent}
          addComment={addComment}
          changeCommentText={changeCommentText}
          deleteComment={deleteComment}
          key={index}
        />
      ))}
    </div>
  );
};

export default EditCommentList;
