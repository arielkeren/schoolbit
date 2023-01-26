import useAppContext from "../../hooks/useAppContext";
import Information from "../general/Information";
import Participant from "./Participant";
import ParticipantTypeTitle from "./ParticipantTypeTitle";

const Owner: React.FC = () => {
  const { classroom } = useAppContext();

  if (!classroom)
    return (
      <Information
        primary="This classroom couldn't be accessed"
        secondary="Check with your teacher if you were accepted into the classroom"
      />
    );

  return (
    <div className="mb-3">
      <ParticipantTypeTitle title="Teacher" />

      <Participant name={classroom.ownerName} />
    </div>
  );
};

export default Owner;
