import useAppContext from "../../hooks/useAppContext";
import Information from "../general/Information";
import Student from "./Student";
import ParticipantTypeTitle from "./ParticipantTypeTitle";

const StudentList: React.FC = () => {
  const { classroom } = useAppContext();

  if (!classroom)
    return (
      <Information
        primary="This classroom couldn't be accessed"
        secondary="Check with your teacher if you were accepted into the classroom"
      />
    );

  if (classroom.participants.length === 0)
    return (
      <>
        <ParticipantTypeTitle title="Students" />

        <Information
          primary="Looks like there are no students here"
          secondary="Tell your students to join your classroom using the code"
        />
      </>
    );

  return (
    <>
      <ParticipantTypeTitle title="Students" />

      {classroom.participants.map((participant) => (
        <Student
          student={participant}
          participants={classroom.participants}
          key={participant.id}
        />
      ))}
    </>
  );
};

export default StudentList;
