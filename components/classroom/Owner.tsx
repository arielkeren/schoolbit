import Participant from "./Participant";

interface Props {
  ownerName: string;
}

const Owner: React.FC<Props> = ({ ownerName }) => {
  return (
    <>
      <h4 className="text-2xl font-bold text-slate-300 uppercase mb-2">
        Teacher
      </h4>

      <Participant name={ownerName} />
    </>
  );
};

export default Owner;
