import { RequestInterface } from "../types";
import Request from "./Request";

interface Props {
  requests: RequestInterface[];
  classroomName: string;
  classroomID: string;
}

const RequestList: React.FC<Props> = ({
  requests,
  classroomName,
  classroomID,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {requests.length === 0 ? (
        <p className="text-gray-500 font-bold text-2xl text-center">
          There are no join requests currently...
        </p>
      ) : (
        <>
          {requests.map((request, index) => (
            <Request
              request={request}
              requests={requests}
              classroomName={classroomName}
              classroomID={classroomID}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RequestList;
