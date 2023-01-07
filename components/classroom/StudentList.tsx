import Participant from "./Participant";
import ParticipantTypeTitle from "./ParticipantTypeTitle";

interface Props {
  students: string[];
}

const StudentList: React.FC<Props> = ({ students }) => (
  <>
    <ParticipantTypeTitle title="Students" />

    {students.length === 0 ? (
      <p className="text-gray-500 font-bold text-2xl text-center">
        There are no students currently
      </p>
    ) : (
      <>
        {students.map((student, index) => (
          <Participant name={student} key={index} />
        ))}
      </>
    )}
  </>
);

export default StudentList;
