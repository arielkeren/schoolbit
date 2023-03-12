import { IComment } from "../../types/types";
import CommentButton from "./CommentButton";

interface Props {
  numberOfLines: number;
  comments: IComment[];
  isFullScreen: boolean;
}

const CommentList: React.FC<Props> = ({
  numberOfLines,
  comments,
  isFullScreen,
}) => {
  const commentContents = [];

  for (let i = 0; i < numberOfLines; i++) {
    commentContents.push("");
  }

  comments.forEach(
    (comment) => (commentContents[comment.line - 1] = comment.text)
  );

  if (isFullScreen)
    return (
      <div className="absolute top-[152px] left-[125px] flex flex-col gap-[10px]">
        {commentContents.map((commentContent, index) => (
          <CommentButton text={commentContent} key={index} />
        ))}
      </div>
    );

  return (
    <div className="absolute top-[32px] left-[4px] flex flex-col gap-[10px]">
      {commentContents.map((commentContent, index) => (
        <CommentButton text={commentContent} key={index} />
      ))}
    </div>
  );
};

export default CommentList;
