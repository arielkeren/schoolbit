import useAppContext from "../../hooks/useAppContext";
import Information from "../general/Information";
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

      <div className="bg-gray-900 flex flex-col gap-1 justify-between p-5 items-center rounded border-b-4 border-gray-700 md:flex-row">
        <p className="text-slate-300 text-2xl">{classroom.ownerName}</p>
      </div>
    </div>
  );
};

export default Owner;
