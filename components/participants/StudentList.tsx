import useAppContext from "../../hooks/useAppContext";
import Information from "../general/Information";
import Participant from "./Participant";
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

      {classroom.participants.map((participant, index) => (
        <Participant name={participant} key={index} />
      ))}
    </>
  );
};

export default StudentList;
