import { RequestInterface } from "../../types";
import Request from "./Request";

interface Props {
  requests: RequestInterface[];
  classroomID: string;
  classroomName: string;
  ownerName: string;
  description: string;
  color: string;
}

const RequestList: React.FC<Props> = ({
  requests,
  classroomID,
  classroomName,
  ownerName,
  description,
  color,
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
              classroomID={classroomID}
              classroomName={classroomName}
              ownerName={ownerName}
              description={description}
              color={color}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RequestList;
