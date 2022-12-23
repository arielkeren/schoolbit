import { IoMdClose } from "react-icons/io";
import Owner from "./Owner";
import ParticipantList from "./ParticipantList";

interface Props {
  participants: string[];
  ownerName: string;
  closeParticipantsScreen: () => void;
}

const ParticipantsScreen: React.FC<Props> = ({
  participants,
  ownerName,
  closeParticipantsScreen,
}) => {
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div
      className="absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-brightness-75"
      onClick={closeParticipantsScreen}
    >
      <div
        className="relative bg-slate-800 h-2/3 w-11/12 py-20 px-3 rounded shadow-xl md:w-2/3 lg:w-1/2"
        onClick={stopPropagation}
      >
        <h3 className="absolute top-3 right-1/2 translate-x-1/2 text-3xl font-bold text-slate-300 uppercase sm:text-4xl">
          Participants
        </h3>
        <button
          onClick={closeParticipantsScreen}
          className="absolute top-3 right-3"
        >
          <IoMdClose className="text-4xl text-slate-500 hover:text-slate-400 transition-colors" />
        </button>

        <Owner ownerName={ownerName} />

        <hr className="border-2 border-slate-400 my-5" />

        <ParticipantList participants={participants} />
      </div>
    </div>
  );
};

export default ParticipantsScreen;
