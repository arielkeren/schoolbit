import { IoMdClose } from "react-icons/io";
import { RequestInterface } from "../../types";
import RequestList from "./RequestList";

interface Props {
  requests: RequestInterface[];
  closeRequestsScreen: () => void;
  classroomName: string;
  classroomID: string;
}

const ParticipantsScreen: React.FC<Props> = ({
  requests,
  closeRequestsScreen,
  classroomName,
  classroomID,
}) => {
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div
      className="absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-brightness-75"
      onClick={closeRequestsScreen}
    >
      <div
        className="relative bg-slate-800 h-2/3 w-11/12 py-20 px-3 rounded shadow-xl md:w-2/3 lg:w-1/2"
        onClick={stopPropagation}
      >
        <h3 className="absolute top-3 right-1/2 translate-x-1/2 text-4xl font-bold text-slate-300 uppercase">
          Requests
        </h3>
        <button
          onClick={closeRequestsScreen}
          className="absolute top-3 right-3"
        >
          <IoMdClose className="text-4xl text-slate-500 hover:text-slate-400 transition-colors" />
        </button>
        <RequestList
          requests={requests}
          classroomName={classroomName}
          classroomID={classroomID}
        />
      </div>
    </div>
  );
};

export default ParticipantsScreen;
