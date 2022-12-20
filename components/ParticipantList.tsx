import Participant from "./Participant";

interface Props {
  participants: string[];
}

const ParticipantList: React.FC<Props> = ({ participants }) => {
  return (
    <>
      <h4 className="text-2xl font-bold text-slate-300 uppercase mb-2">
        Students
      </h4>

      {participants.length === 0 ? (
        <p className="text-gray-500 font-bold text-2xl text-center">
          There are no students currently...
        </p>
      ) : (
        <>
          {participants.map((participant, index) => (
            <Participant name={participant} key={index} />
          ))}
        </>
      )}
    </>
  );
};

export default ParticipantList;
