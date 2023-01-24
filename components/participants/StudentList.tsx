import useAppContext from "../../hooks/useAppContext";
import Participant from "./Participant";
import ParticipantTypeTitle from "./ParticipantTypeTitle";

const StudentList: React.FC = () => {
  const { classroom } = useAppContext();

  return (
    <>
      <ParticipantTypeTitle title="Students" />

      {classroom ? (
        <>
          {classroom.participants.length > 0 ? (
            <>
              {classroom.participants.map((participant, index) => (
                <Participant name={participant} key={index} />
              ))}
            </>
          ) : (
            <p className="text-gray-500 font-bold text-2xl text-center">
              There are no students currently
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-500 font-bold text-2xl text-center">Loading</p>
      )}
    </>
  );
};

export default StudentList;
