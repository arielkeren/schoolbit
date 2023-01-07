import Participant from "./Participant";
import ParticipantTypeTitle from "./ParticipantTypeTitle";

interface Props {
  ownerName: string;
}

const Owner: React.FC<Props> = ({ ownerName }) => (
  <>
    <ParticipantTypeTitle title="Teacher" />

    <Participant name={ownerName} />
  </>
);

export default Owner;
