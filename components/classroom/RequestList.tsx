import useAppContext from "../../hooks/useAppContext";
import Request from "./Request";

const RequestList: React.FC = () => {
  const { classroom } = useAppContext();

  return (
    <>
      {classroom ? (
        <div className="flex flex-col gap-3">
          {classroom.requests.length > 0 ? (
            <>
              {classroom.requests.map((request, index) => (
                <Request request={request} key={index} />
              ))}
            </>
          ) : (
            <p className="text-gray-500 font-bold text-2xl text-center">
              There are no join requests currently
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 font-bold text-2xl text-center">
          Failed to get the requests
        </p>
      )}
    </>
  );
};

export default RequestList;
