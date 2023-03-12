import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CodeEditor from "../../../../../../components/general/CodeEditor";
import Head from "next/head";
import useAppContext from "../../../../../../hooks/useAppContext";
import Header from "../../../../../../components/general/Header";
import Sidebar from "../../../../../../components/general/Sidebar";
import EmptyArea from "../../../../../../components/general/EmptyArea";
import Information from "../../../../../../components/general/Information";
import TeacherSidebar from "../../../../../../components/general/TeacherSidebar";
import StudentSidebar from "../../../../../../components/general/StudentSidebar";
import Loading from "../../../../../../components/general/Loading";
import CommentList from "../../../../../../components/general/CommentList";
import EditCommentList from "../../../../../../components/answer/EditCommentList";
import { IComment } from "../../../../../../types/types";
import GradeTeacherSidebar from "../../../../../../components/answer/GradeTeacherSidebar";
import GradeModal from "../../../../../../components/answer/GradeModal";
import useModal from "../../../../../../hooks/useModal";

const AnswerPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<string | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

  const [isGradeModalOpen, openGradeModal, closeGradeModal] = useModal();

  const router = useRouter();
  const { classroomID, assignmentID, studentID } = router.query as {
    classroomID: string;
    assignmentID: string;
    studentID: string;
  };

  useEffect(() => {
    getClassroom(classroomID).then(() => setIsLoading(false));
  }, [getClassroom, classroomID]);

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) =>
    setLanguage(event.target.value);

  if (isLoading) return <Loading />;

  if (!classroom)
    return (
      <>
        <Head>
          <title>Classroom Not Found | SchoolBit</title>
        </Head>

        <Header title="Classroom Not Found" />

        <Sidebar />

        <EmptyArea>
          <Information
            primary="This classroom couldn't be accessed"
            secondary="Check with your teacher if you were accepted into the classroom"
          />
        </EmptyArea>
      </>
    );

  const assignment = classroom.assignments.find(
    (currentAssignment) => currentAssignment.id === assignmentID
  );

  if (!assignment)
    return (
      <>
        <Head>
          <title>Assignment Not Found | SchoolBit</title>
        </Head>

        <Header title="Assignment Not Found" />

        {user?.uid === classroom.ownerID ? (
          <TeacherSidebar />
        ) : (
          <StudentSidebar />
        )}

        <EmptyArea>
          <Information
            primary="This assignment doesn't exist"
            secondary="Make sure you didn't change anything in the link"
          />
        </EmptyArea>
      </>
    );

  const answer = assignment.answers.find(
    (currentAnswer) => currentAnswer.senderID === studentID
  );

  if (!answer)
    return (
      <>
        <Head>
          <title>Answer Not Found | SchoolBit</title>
        </Head>

        <Header title="Answer Not Found" />

        {user?.uid === classroom.ownerID ? (
          <TeacherSidebar />
        ) : (
          <StudentSidebar />
        )}

        <EmptyArea>
          <Information
            primary="This answer doesn't exist"
            secondary="Make sure you didn't change anything in the link"
          />
        </EmptyArea>
      </>
    );

  const addComment = (lineNumber: number) => {
    if (comments.some((comment) => comment.line === lineNumber)) return;

    setComments((previousComments) => [
      ...previousComments,
      { line: lineNumber, text: "" },
    ]);
  };

  const changeCommentText = (lineNumber: number, newText: string) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.line === lineNumber
    );

    const newComments = [...comments];

    newComments[commentIndex].text = newText;

    setComments(newComments);
  };

  const deleteComment = (lineNumber: number) =>
    setComments((previousComments) =>
      previousComments.filter((comment) => comment.line !== lineNumber)
    );

  const numberOfLines = answer.code.split(/\r*\n/).length;

  return (
    <>
      <Head>
        <title>{answer.senderName}&apos;s Answer | SchoolBit</title>
      </Head>

      <Header title={`${answer.senderName}'s Answer`} />

      {user?.uid === classroom.ownerID ? (
        <>
          <EmptyArea>
            <div className="mb-14">
              <CodeEditor
                code={answer.code}
                language={language ?? answer.language}
                changeLanguage={changeLanguage}
                height={`${(numberOfLines + 1) * 34.15}px`}
                width="100%"
              />
            </div>

            {answer.checked ? (
              <>
                <TeacherSidebar />

                <CommentList
                  numberOfLines={numberOfLines}
                  comments={answer.comments}
                  isFullScreen={true}
                />

                <Information
                  primary="You've already graded this student's code"
                  secondary={`The grade you've given is: ${answer.grade}`}
                />
              </>
            ) : (
              <>
                <GradeTeacherSidebar openGradeModal={openGradeModal} />

                <EditCommentList
                  numberOfLines={numberOfLines}
                  comments={comments}
                  addComment={addComment}
                  changeCommentText={changeCommentText}
                  deleteComment={deleteComment}
                />

                {isGradeModalOpen && (
                  <GradeModal
                    code={answer.code}
                    language={answer.language}
                    comments={comments}
                    closeModal={closeGradeModal}
                  />
                )}
              </>
            )}
          </EmptyArea>
        </>
      ) : (
        <>
          <StudentSidebar />

          <EmptyArea>
            <Information
              primary="You're not eligible for seeing other students' answers"
              secondary="Only the teacher can see students' answers"
            />
          </EmptyArea>
        </>
      )}
    </>
  );
};

export default AnswerPage;
