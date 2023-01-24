import useAppContext from "../../hooks/useAppContext";
import Participant from "./Participant";
import ParticipantTypeTitle from "./ParticipantTypeTitle";

const Owner: React.FC = () => {
  const { classroom } = useAppContext();

  return (
    <>
      <ParticipantTypeTitle title="Teacher" />

      <Participant name={classroom?.ownerName ?? "Loading"} />
    </>
  );
};

export default Owner;
